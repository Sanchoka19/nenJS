import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AppointmentModal from './components/AppointmentModal';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const openModal = (mode, appointment = null) => {
    setModalMode(mode);
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const dashboardPaths = [
    '/',
    '/calendar',
    '/clients',
    '/services',
    '/finance',
    '/employees',
    '/admin',
    '/settings',
  ];

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1">
          <Header 
            onMenuClick={toggleSidebar} 
            onNewAppointment={() => openModal('create')} 
          />

          <Routes>
            {dashboardPaths.map((path) => (
              <Route 
                key={path} 
                path={path} 
                element={
                  <Dashboard 
                    onEditAppointment={(appointment) => openModal('edit', appointment)} 
                  />
                } 
              />
            ))}
          </Routes>

          {isModalOpen && (
            <AppointmentModal
              mode={modalMode}
              appointment={selectedAppointment}
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
