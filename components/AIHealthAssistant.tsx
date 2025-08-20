
import React, { useState, useRef, useEffect } from 'react';
import { GenerateContentResponse } from "@google/genai";
import { getAIResponseStream } from '../services/geminiService';
import { AITopicSuggestion } from '../types';
import { SendIcon, HeartIcon, BrainIcon, BoneIcon, SunIcon } from './Icons';

const topicSuggestions: AITopicSuggestion[] = [
    { icon: HeartIcon, title: "Heart Health", prompt: "What are some common signs of heart problems I should watch out for?" },
    { icon: SunIcon, title: "Skin Care", prompt: "What are the best practices for protecting my skin from sun damage?" },
    { icon: BoneIcon, title: "Joint Pain", prompt: "Can you explain the difference between osteoarthritis and rheumatoid arthritis?" },
    { icon: BrainIcon, title: "Headaches", prompt: "What are some potential triggers for frequent headaches?" },
];

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const AIHealthAssistant: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (prompt?: string) => {
        const userMessage = prompt || input;
        if (!userMessage.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        // Add a placeholder for the AI response
        setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

        try {
            const stream = await getAIResponseStream(userMessage);
            let currentAIResponse = '';
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                currentAIResponse += chunkText;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { sender: 'ai', text: currentAIResponse };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { sender: 'ai', text: "I'm sorry, I encountered an error. Please try again later." };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[85vh] bg-white rounded-2xl shadow-lg">
            <div className="p-4 border-b">
                <h1 className="text-2xl font-bold text-slate-800">AI Health Assistant</h1>
                <p className="text-sm text-slate-500">Get preliminary health information. Not a substitute for professional medical advice.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center py-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-slate-700">How can I help you today?</h2>
                            <p className="text-slate-500">Select a topic or type your question below.</p>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {topicSuggestions.map((topic, i) => (
                                <button key={i} onClick={() => handleSend(topic.prompt)} className="bg-slate-50 p-4 rounded-lg text-left hover:bg-slate-100 transition">
                                    <topic.icon className="w-6 h-6 text-providence-green mb-2" />
                                    <p className="font-semibold text-slate-800">{topic.title}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                         {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-providence-green flex-shrink-0 mt-1"></div>}
                        <div className={`max-w-xl p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-providence-blue text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                           <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}/>
                           {isLoading && msg.sender === 'ai' && index === messages.length -1 && <span className="inline-block w-2 h-2 ml-1 bg-slate-500 rounded-full animate-pulse"></span>}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white rounded-b-2xl">
                <div className="flex items-center bg-slate-100 rounded-xl p-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Describe your symptoms or ask a question..."
                        className="flex-1 bg-transparent border-none focus:ring-0 outline-none px-2 text-slate-700"
                        disabled={isLoading}
                    />
                    <button onClick={() => handleSend()} disabled={isLoading || !input.trim()} className="bg-providence-green text-white p-2 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed transition">
                        <SendIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIHealthAssistant;
