
import React from 'react';
import { Appointment } from '../types';
import { CalendarIcon, StethoscopeIcon, FileTextIcon, ClockIcon, VideoIcon } from './Icons';

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg ${className}`}>
        {children}
    </div>
);

const ActionCard = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) => (
    <div onClick={onClick} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="bg-providence-green/10 text-providence-green p-3 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-slate-800 text-lg mb-1">{title}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
    </div>
);

interface DashboardProps {
    setActiveView: (view: 'appointments' | 'find-doctor' | 'records') => void;
    appointments: Appointment[];
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView, appointments }) => {
    
    const upcomingAppointment = appointments
        .filter(a => a.status === 'Upcoming' && new Date(a.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // This is to avoid timezone issues where it might become the previous day.
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
    };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Welcome back, Jane!</h1>
        <p className="text-slate-500 mt-1">Here's your health summary for today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointment Card */}
        <div className="lg:col-span-2">
            <Card className="bg-providence-blue text-white">
                <h2 className="font-bold text-xl mb-4 text-providence-green">Upcoming Appointment</h2>
                {upcomingAppointment ? (
                    <>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <img src={upcomingAppointment.doctor.avatar} alt={upcomingAppointment.doctor.name} className="w-20 h-20 rounded-full border-4 border-providence-green" />
                            <div>
                                <p className="text-2xl font-semibold">{upcomingAppointment.doctor.name}</p>
                                <p className="text-slate-200">{upcomingAppointment.doctor.specialty}</p>
                            </div>
                        </div>
                        <div className="mt-6 border-t border-providence-blue/50 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center">
                                <CalendarIcon className="w-5 h-5 mr-3 text-providence-green" />
                                <span>{formatDate(upcomingAppointment.date)}</span>
                            </div>
                            <div className="flex items-center">
                                <ClockIcon className="w-5 h-5 mr-3 text-providence-green" />
                                <span>{upcomingAppointment.time}</span>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button className="bg-providence-green text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center transition hover:opacity-90">
                                <VideoIcon className="w-5 h-5 mr-2"/>
                                Join Virtual Appointment
                            </button>
                            <button className="bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition hover:bg-white/30">
                                Reschedule
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <button onClick={() => setActiveView('find-doctor')} className="bg-providence-green text-white font-semibold py-2 px-6 rounded-lg transition hover:opacity-90">
                            Book an Appointment
                        </button>
                    </div>
                )}
            </Card>
        </div>

        {/* Reminders Card */}
        <Card>
            <h2 className="font-bold text-xl mb-4 text-slate-800">Notifications</h2>
            <ul className="space-y-4">
                <li className="flex items-start">
                    <div className="bg-accent-blue/10 text-accent-blue p-2 rounded-full mr-3 mt-1">
                        <FileTextIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-700">New Lab Results</p>
                        <p className="text-sm text-slate-500">Your results from Aug 1st are available.</p>
                    </div>
                </li>
                 <li className="flex items-start">
                    <div className="bg-accent-green/10 text-accent-green p-2 rounded-full mr-3 mt-1">
                        <StethoscopeIcon className="w-5 h-5"/>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-700">Appointment Confirmed</p>
                        <p className="text-sm text-slate-500">Dr. Reed, Tomorrow at 10:30 AM.</p>
                    </div>
                </li>
            </ul>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard icon={<CalendarIcon/>} title="Book Appointment" description="Find a doctor and schedule a new visit." onClick={() => setActiveView('find-doctor')} />
            <ActionCard icon={<StethoscopeIcon/>} title="Find a Doctor" description="Search for specialists and view their profiles." onClick={() => setActiveView('find-doctor')} />
            <ActionCard icon={<FileTextIcon/>} title="View Records" description="Access your medical history and lab results." onClick={() => setActiveView('records')} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
