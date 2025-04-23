import { useRef, useMemo, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { sampleAppointments } from '../data/appointments';
import { getClassNameFromStatus } from '../utils/statusUtils';

function Calendar({ onEditAppointment }) {
  const calendarRef = useRef(null);

  // ✅ Memoize events to avoid re-creating on every render
  const events = useMemo(() => {
    return sampleAppointments.map(appointment => ({
      id: appointment.id,
      title: `${appointment.clientName} - ${appointment.service}`,
      start: appointment.startTime,
      end: appointment.endTime,
      className: getClassNameFromStatus(appointment.status),
    }));
  }, []);

  // ✅ Memoize plugins and header config
  const calendarPlugins = useMemo(() => [dayGridPlugin, interactionPlugin], []);
  const headerToolbarConfig = useMemo(() => ({
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek',
  }), []);

  // ✅ Memoize handler functions
  const handleEventClick = useCallback((info) => {
    const appointment = sampleAppointments.find(
      a => a.id === parseInt(info.event.id)
    );
    if (appointment) {
      onEditAppointment(appointment);
    }
  }, [onEditAppointment]);

  const handleDateClick = useCallback((info) => {
    console.log('Date clicked:', info.dateStr);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">კალენდარი</h2>
      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={calendarPlugins}
          initialView="dayGridMonth"
          headerToolbar={headerToolbarConfig}
          locale="ka"
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          height="auto"
        />
      </div>
    </div>
  );
}

export default Calendar;
