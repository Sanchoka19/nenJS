import { useState, useEffect, useMemo } from 'react';
import MetricsChart from './MetricsChart';
import Calendar from './Calendar';
import TodayAppointments from './TodayAppointments';
import QuickActions from './QuickActions';
import Notifications from './Notifications';
import AppointmentModal from './AppointmentModal';

function Dashboard({ onEditAppointment }) {
  const [metrics, setMetrics] = useState({
    visits: 0,
    todayIncome: 0,
    monthIncome: 0
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const handleOpenModal = (mode, appointment = null) => {
    setModalMode(mode);
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = (formData) => {
    if (formData) {
      const newAppointment = {
        id: Date.now(), // Generate a unique ID
        ...formData,
        createdAt: new Date().toISOString()
      };

      if (modalMode === 'create') {
        setAppointments(prev => [...prev, newAppointment]);
      } else if (modalMode === 'edit' && selectedAppointment) {
        setAppointments(prev => 
          prev.map(app => 
            app.id === selectedAppointment.id ? { ...app, ...formData } : app
          )
        );
      }
    }
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
  };

  // Filter appointments for today
  const todayAppointments = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.startTime);
      appointmentDate.setHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime();
    });
  }, [appointments]);

  // Calculate metrics based on appointments
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.startTime);
      appointmentDate.setHours(0, 0, 0, 0);
      return appointmentDate.getTime() === today.getTime() && 
             appointment.status !== 'გაუქმებული';
    });

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.startTime);
      return appointmentDate >= monthStart && 
             appointmentDate <= today && 
             appointment.status !== 'გაუქმებული';
    });

    // Calculate income (assuming each service has a fixed price for now)
    const servicePrices = {
      'თმის შეჭრა': 30,
      'თმის დავარცხნა': 20,
      'თმის შეღებვა': 50
    };

    const todayIncome = todayAppointments.reduce((sum, app) => 
      sum + (servicePrices[app.service] || 0), 0
    );

    const monthIncome = monthAppointments.reduce((sum, app) => 
      sum + (servicePrices[app.service] || 0), 0
    );

    setMetrics({
      visits: todayAppointments.length,
      todayIncome,
      monthIncome
    });
  }, [appointments]);

  // Reset metrics every 24 hours
  useEffect(() => {
    const resetMetrics = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const timeUntilReset = tomorrow.getTime() - new Date().getTime();
      
      const timer = setTimeout(() => {
        setMetrics(prev => ({
          ...prev,
          visits: 0,
          todayIncome: 0
        }));
      }, timeUntilReset);

      return () => clearTimeout(timer);
    };

    const timer = resetMetrics();
    return () => clearTimeout(timer);
  }, []);

  // ✅ Optionally memoize visual metric cards (if they ever cause re-renders)
  const metricCards = useMemo(() => [
    {
      value: metrics.visits,
      label: 'დღევანდელი ვიზიტები',
      color: 'text-blue-600'
    },
    {
      value: `${metrics.todayIncome} ₾`,
      label: 'დღევანდელი შემოსავალი',
      color: 'text-green-600'
    },
    {
      value: `${metrics.monthIncome} ₾`,
      label: 'თვის შემოსავალი',
      color: 'text-purple-600'
    }
  ], [metrics]);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {metricCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
          >
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayAppointments 
            appointments={todayAppointments}
            onEditAppointment={(appointment) => handleOpenModal('edit', appointment)}
            onDeleteAppointment={handleDeleteAppointment}
          />
        </div>
        <div>
          <QuickActions 
            onNewAppointment={() => handleOpenModal('create')}
            onNewClient={() => {}}
          />
        </div>
      </div>

      <div className="mt-6">
        <MetricsChart />
      </div>

      <div className="mt-6">
        <Calendar 
          appointments={appointments}
          onEditAppointment={(appointment) => handleOpenModal('edit', appointment)}
        />
      </div>

      <div className="mt-6">
        <Notifications />
      </div>

      {/* Appointment Modal */}
      {isModalOpen && (
        <AppointmentModal
          mode={modalMode}
          appointment={selectedAppointment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Dashboard;
