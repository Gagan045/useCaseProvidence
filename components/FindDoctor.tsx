
import React, { useState } from 'react';
import { Doctor, Appointment } from '../types';
import { XIcon } from './Icons';

const DoctorCard: React.FC<{ doctor: Doctor; onSelect: (doctor: Doctor) => void }> = ({ doctor, onSelect }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 text-center flex flex-col items-center">
            <img src={doctor.avatar} alt={doctor.name} className="w-28 h-28 rounded-full mb-4 border-4 border-slate-200"/>
            <h3 className="text-xl font-bold text-slate-800">{doctor.name}</h3>
            <p className="text-providence-green font-semibold mb-3">{doctor.specialty}</p>
            <p className="text-slate-500 text-sm flex-grow mb-4">{doctor.bio}</p>
            <button onClick={() => onSelect(doctor)} className="bg-providence-green text-white font-bold py-2 px-5 rounded-lg w-full transition hover:opacity-90">
                View Schedule
            </button>
        </div>
    );
};

interface ScheduleModalProps {
    doctor: Doctor;
    onClose: () => void;
    onBookAppointment: (appointment: Appointment) => void;
    setActiveView: (view: 'appointments') => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ doctor, onClose, onBookAppointment, setActiveView }) => {
    const [selectedDate, setSelectedDate] = useState(Object.keys(doctor.availability)[0]);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [reason, setReason] = useState('');

    const handleConfirm = () => {
        if (!selectedDate || !selectedTime || !reason.trim()) {
            alert("Please select a date, time, and provide a reason for your visit.");
            return;
        }
        const newAppointment: Appointment = {
            id: `appt-${Date.now()}`,
            doctor,
            date: selectedDate,
            time: selectedTime,
            reason,
            status: 'Upcoming',
        };
        onBookAppointment(newAppointment);
        onClose();
        setActiveView('appointments');
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-slate-800">Book with {doctor.name}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XIcon /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">1. Select a Date</h3>
                        <div className="flex space-x-2">
                        {Object.keys(doctor.availability).map(date => (
                            <button key={date} onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold ${selectedDate === date ? 'bg-providence-green text-white' : 'bg-slate-100 text-slate-700'}`}>
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">2. Select an Available Time</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {doctor.availability[selectedDate]?.map(time => (
                                <button key={time} onClick={() => setSelectedTime(time)}
                                    className={`p-3 rounded-lg text-sm font-semibold text-center ${selectedTime === time ? 'bg-providence-blue text-white' : 'bg-slate-100 text-providence-blue'}`}>
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">3. Reason for Visit</h3>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g. Annual check-up, feeling unwell..."
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-providence-green focus:outline-none"
                            rows={3}
                        />
                    </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-b-2xl flex justify-end">
                    <button 
                        onClick={handleConfirm}
                        disabled={!selectedTime || !reason.trim()} 
                        className="bg-providence-green text-white font-bold py-2 px-6 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed transition"
                    >
                        Confirm Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

interface FindDoctorProps {
    doctors: Doctor[];
    onBookAppointment: (appointment: Appointment) => void;
    setActiveView: (view: 'appointments') => void;
}

const FindDoctor: React.FC<FindDoctorProps> = ({ doctors, onBookAppointment, setActiveView }) => {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    return (
        <div className="space-y-6">
             <h1 className="text-3xl font-bold text-slate-800">Find a Doctor</h1>
            {/* Search and Filter UI */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4">
                <input type="text" placeholder="Search by name, specialty..." className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-providence-green focus:outline-none"/>
                <select className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-providence-green focus:outline-none bg-white">
                    <option>All Specialties</option>
                    <option>Cardiology</option>
                    <option>Dermatology</option>
                    <option>Pediatrics</option>
                    <option>Orthopedics</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {doctors.map(doc => (
                    <DoctorCard key={doc.id} doctor={doc} onSelect={setSelectedDoctor} />
                ))}
            </div>

            {selectedDoctor && <ScheduleModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} onBookAppointment={onBookAppointment} setActiveView={setActiveView} />}
        </div>
    );
};

export default FindDoctor;
