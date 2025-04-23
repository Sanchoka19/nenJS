import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { sampleAppointments } from './data.js';
import { openModal } from './modal.js';
import { getClassNameFromStatus } from './utils.js';

let calendar;

export const initCalendar = () => {
  const calendarEl = document.getElementById('fullCalendar');
  
  calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    locale: 'ka',
    events: sampleAppointments.map(appointment => ({
      id: appointment.id,
      title: `${appointment.clientName} - ${appointment.service}`,
      start: appointment.startTime,
      end: appointment.endTime,
      className: getClassNameFromStatus(appointment.status)
    })),
    eventClick: (info) => {
      const appointment = sampleAppointments.find(a => a.id === parseInt(info.event.id));
      if (appointment) {
        openModal('edit');
        populateModalForEdit(appointment);
      }
    },
    dateClick: (info) => {
      openModal('create');
      const datetimePicker = document.getElementById('datetimePicker');
      if (datetimePicker) {
        datetimePicker.value = info.dateStr;
      }
    }
  });

  calendar.render();
};

export const updateCalendarEvents = (appointments) => {
  if (calendar) {
    calendar.removeAllEvents();
    calendar.addEventSource(appointments.map(appointment => ({
      id: appointment.id,
      title: `${appointment.clientName} - ${appointment.service}`,
      start: appointment.startTime,
      end: appointment.endTime,
      className: getClassNameFromStatus(appointment.status)
    })));
  }
}; 