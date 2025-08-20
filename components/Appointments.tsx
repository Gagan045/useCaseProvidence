
import React, { useState } from 'react';
import { Appointment } from '../types';

interface AppointmentCardProps {
    appointment: Appointment;
    onReschedule?: () => void;
    onCancel?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onReschedule, onCancel }) => {
    const statusClasses = {
        Upcoming: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // This is to avoid timezone issues where it might become the previous day.
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img src={appointment.doctor.avatar} alt={appointment.doctor.name} className="w-20 h-20 rounded-full"/>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800">{appointment.doctor.name}</h3>
                        <p className="text-slate-500">{appointment.doctor.specialty}</p>
                    </div>
                     <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusClasses[appointment.status]}`}>
                        {appointment.status}
                    </span>
                </div>
                <div className="border-t my-3"></div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-slate-600 text-sm">
                    <p><strong>Date:</strong> {formatDate(appointment.date)}</p>
                    <p><strong>Time:</strong> {appointment.time}</p>
                    <p><strong>Reason:</strong> {appointment.reason}</p>
                </div>
            </div>
             {appointment.status === 'Upcoming' && (
                <div className="flex sm:flex-col gap-2 w-full sm:w-auto pt-4 sm:pt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l">
                    <button onClick={onReschedule} className="bg-providence-green text-white px-3 py-2 rounded-lg text-sm font-semibold w-full transition hover:opacity-90">Reschedule</button>
                    <button onClick={onCancel} className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-sm font-semibold w-full transition hover:bg-slate-300">Cancel</button>
                </div>
            )}
        </div>
    );
};

interface AppointmentsProps {
    appointments: Appointment[];
    setActiveView: (view: 'find-doctor') => void;
    onCancelAppointment: (id: string) => void;
    onReschedule: (id: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments, setActiveView, onCancelAppointment, onReschedule }) => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming').sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pastAppointments = appointments.filter(a => a.status !== 'Upcoming').sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-slate-800">Appointments</h1>
                <button 
                    onClick={() => setActiveView('find-doctor')}
                    className="bg-providence-green text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-providence-green/90 transition"
                >
                    + Book New Appointment
                </button>
            </div>

            <div>
                <div className="border-b border-slate-200">
                    <nav className="-mb-px flex space-x-6">
                        <button 
                            onClick={() => setActiveTab('upcoming')}
                            className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'upcoming' ? 'border-providence-green text-providence-green' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                        >
                            Upcoming
                        </button>
                        <button 
                            onClick={() => setActiveTab('past')}
                            className={`py-3 px-1 border-b-2 font-semibold text-sm ${activeTab === 'past' ? 'border-providence-green text-providence-green' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                        >
                            Past
                        </button>
                    </nav>
                </div>
            </div>

            <div className="space-y-5">
                {activeTab === 'upcoming' && (
                    upcomingAppointments.length > 0 
                        ? upcomingAppointments.map(app => <AppointmentCard key={app.id} appointment={app} onCancel={() => onCancelAppointment(app.id)} onReschedule={() => onReschedule(app.id)} />)
                        : <p className="text-center text-slate-500 py-8">No upcoming appointments.</p>
                )}
                 {activeTab === 'past' && (
                    pastAppointments.length > 0 
                        ? pastAppointments.map(app => <AppointmentCard key={app.id} appointment={app} />)
                        : <p className="text-center text-slate-500 py-8">No past appointments.</p>
                )}
            </div>
        </div>
    );
};

export default Appointments;
