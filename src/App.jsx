import { useState, useEffect, useCallback } from 'react';
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const openModal = useCallback((mode, appointment = null) => {
    setModalMode(mode);
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  }, []);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        if (window.innerWidth >= 1024 && !isSidebarOpen) {
          setIsSidebarOpen(true);
        } else if (window.innerWidth < 1024 && isSidebarOpen) {
          setIsSidebarOpen(false);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [isSidebarOpen]);

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
      <div className="layout-container">
        <div className="flex h-screen overflow-hidden">
          <Sidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen}
            className="sidebar-transition"
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            <Header 
              onMenuClick={toggleSidebar} 
              onNewAppointment={() => openModal('create')} 
            />

            <main className="flex-1 overflow-y-auto">
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
            </main>

            {isModalOpen && (
              <AppointmentModal
                mode={modalMode}
                appointment={selectedAppointment}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
