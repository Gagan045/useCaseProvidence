
import React, { useState, useCallback } from 'react';
import { DashboardIcon, CalendarIcon, StethoscopeIcon, FileTextIcon, SparklesIcon, UserIcon, MenuIcon, XIcon, LogOutIcon } from './components/Icons';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import FindDoctor from './components/FindDoctor';
import MedicalRecords from './components/MedicalRecords';
import AIHealthAssistant from './components/AIHealthAssistant';
import Login from './components/Login';
import { Appointment, Doctor } from './types';

type View = 'dashboard' | 'appointments' | 'find-doctor' | 'records' | 'ai-assistant';

// Mock Data moved to App component to serve as a single source of truth
const mockDoctors: Doctor[] = [
    { id: 'doc-1', name: 'Dr. Evelyn Reed', specialty: 'Cardiology', avatar: 'https://picsum.photos/id/1027/200/200', bio: 'Dr. Reed has over 15 years of experience in cardiac care and is a leading expert in preventative cardiology.', availability: {'2025-08-11': ['09:00', '10:00', '11:00'], '2025-08-12': ['14:00', '15:00'], '2025-08-14': ['09:00', '11:30']} },
    { id: 'doc-2', name: 'Dr. Samuel Chen', specialty: 'Dermatology', avatar: 'https://picsum.photos/id/1005/200/200', bio: 'Specializing in both cosmetic and medical dermatology, Dr. Chen is dedicated to providing comprehensive skin care.', availability: {'2025-08-11': ['13:00'], '2025-08-13': ['10:00', '11:00', '16:00'], '2025-08-15': ['09:30', '10:30']} },
    { id: 'doc-3', name: 'Dr. Maria Garcia', specialty: 'Pediatrics', avatar: 'https://picsum.photos/id/1011/200/200', bio: 'Dr. Garcia provides compassionate care for children from infancy through adolescence.', availability: {'2025-08-12': ['08:00', '09:00', '10:00'], '2025-08-13': ['08:00', '11:00'], '2025-08-14': ['13:00', '14:30']} },
    { id: 'doc-4', name: 'Dr. Ben Carter', specialty: 'Orthopedics', avatar: 'https://picsum.photos/id/1012/200/200', bio: 'An expert in sports medicine and joint replacement, Dr. Carter helps patients regain mobility and live pain-free.', availability: {'2025-08-11': ['15:00', '16:00'], '2025-08-13': ['09:00'], '2025-08-15': ['13:00', '14:00', '15:00']} },
];

const initialAppointments: Appointment[] = [
    { id: 'appt-1', doctor: mockDoctors[0], date: '2025-08-11', time: '10:00', reason: 'Annual Check-up', status: 'Upcoming' },
    { id: 'appt-2', doctor: mockDoctors[1], date: '2025-08-13', time: '16:00', reason: 'Skin Rash Consultation', status: 'Upcoming' },
    { id: 'appt-3', doctor: mockDoctors[0], date: '2025-07-20', time: '09:00', reason: 'Follow-up', status: 'Completed' },
    { id: 'appt-4', doctor: mockDoctors[1], date: '2025-06-15', time: '11:00', reason: 'Mole Check', status: 'Completed' },
];


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [doctors] = useState<Doctor[]>(mockDoctors);
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };
  
  const handleBookAppointment = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev].sort((a, b) => {
      if (a.status === 'Upcoming' && b.status !== 'Upcoming') return -1;
      if (a.status !== 'Upcoming' && b.status === 'Upcoming') return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }));
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(appt => 
      appt.id === appointmentId ? { ...appt, status: 'Cancelled' } : appt
    ));
  };
  
  const handleReschedule = (appointmentId: string) => {
    handleCancelAppointment(appointmentId);
    setCurrentView('find-doctor');
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setActiveView={setCurrentView} appointments={appointments} />;
      case 'appointments':
        return <Appointments appointments={appointments} setActiveView={setCurrentView} onCancelAppointment={handleCancelAppointment} onReschedule={handleReschedule} />;
      case 'find-doctor':
        return <FindDoctor doctors={doctors} onBookAppointment={handleBookAppointment} setActiveView={setCurrentView} />;
      case 'records':
        return <MedicalRecords />;
      case 'ai-assistant':
        return <AIHealthAssistant />;
      default:
        return <Dashboard setActiveView={setCurrentView} appointments={appointments} />;
    }
  };

  const NavItem = useCallback(<T extends View,>({ view, label, icon, current }: { view: T, label: string, icon: React.ReactNode, current: View }) => (
    <li
      onClick={() => {
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors ${
        current === view
          ? 'bg-providence-green text-white'
          : 'text-slate-100 hover:bg-providence-blue/60'
      }`}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </li>
  ), []);

  const sidebarContent = (
      <>
        <div className="flex items-center justify-between p-4 mb-6 border-b border-providence-blue/50">
          <h1 className="text-2xl font-bold text-white">
            Health<span className="text-providence-green">Hub</span>
          </h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white">
            <XIcon />
          </button>
        </div>
        <nav className="px-2">
          <ul>
            <NavItem view="dashboard" label="Dashboard" icon={<DashboardIcon />} current={currentView} />
            <NavItem view="appointments" label="Appointments" icon={<CalendarIcon />} current={currentView} />
            <NavItem view="find-doctor" label="Find a Doctor" icon={<StethoscopeIcon />} current={currentView} />
            <NavItem view="records" label="Medical Records" icon={<FileTextIcon />} current={currentView} />
            <NavItem view="ai-assistant" label="AI Health Assistant" icon={<SparklesIcon />} current={currentView} />
          </ul>
        </nav>
        <div className="mt-auto p-4 border-t border-providence-blue/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-providence-green flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                <p className="font-semibold text-white">Jane Doe</p>
                <p className="text-sm text-slate-300">Patient ID: 73856</p>
                </div>
            </div>
            <button onClick={handleLogout} className="text-slate-300 hover:text-white transition-colors" title="Log Out">
                <LogOutIcon />
            </button>
          </div>
        </div>
      </>
  );

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 bg-providence-blue/80 backdrop-blur-sm lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}></div>
      <aside className={`fixed top-0 left-0 h-full w-72 bg-providence-blue flex flex-col z-40 transform transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {sidebarContent}
      </aside>
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-providence-blue flex-col flex-shrink-0">
        {sidebarContent}
      </aside>

      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between lg:justify-end p-4 bg-white border-b sticky top-0 z-10">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-600">
            <MenuIcon />
          </button>
          <div className="flex items-center">
             {/* Future Header Items can go here like search or notifications */}
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8 flex-1">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
