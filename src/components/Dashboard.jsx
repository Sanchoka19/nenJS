import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import MetricsChart from './MetricsChart';
import Calendar from './Calendar';
import TodayAppointments from './TodayAppointments';
import QuickActions from './QuickActions';
import Notifications from './Notifications';
import AppointmentModal from './AppointmentModal';

const MetricCard = memo(({ card }) => (
  <div className="responsive-card">
    <p className={`text-2xl sm:text-3xl font-bold ${card.color}`}>{card.value}</p>
    <p className="text-xs sm:text-sm text-gray-500">{card.label}</p>
  </div>
));

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

  const handleOpenModal = useCallback((mode, appointment = null) => {
    setModalMode(mode);
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((formData) => {
    if (formData) {
      const newAppointment = {
        id: Date.now(),
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
  }, [modalMode, selectedAppointment]);

  const handleDeleteAppointment = useCallback((appointmentId) => {
    setAppointments(prev => prev.filter(app => app.id !== appointmentId));
  }, []);

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

  // Memoize metric cards
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
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">მართვის პანელი</h1>
      <div className="responsive-grid mb-6">
        {metricCards.map((card, index) => (
          <MetricCard key={index} card={card} />
        ))}
      </div>

      <div className="responsive-grid">
        <div className="lg:col-span-2">
          <TodayAppointments 
            appointments={todayAppointments}
            onEditAppointment={handleOpenModal}
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

      <div className="mt-4 sm:mt-6">
        <MetricsChart />
      </div>

      <div className="mt-4 sm:mt-6">
        <Calendar 
          appointments={appointments}
          onEditAppointment={handleOpenModal}
        />
      </div>

      <div className="mt-4 sm:mt-6">
        <Notifications />
      </div>

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

export default memo(Dashboard);
