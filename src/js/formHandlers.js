import { sampleAppointments } from './data.js';
import { updateCalendarEvents } from './calendar.js';
import { renderTodayAppointments } from './domUpdates.js';
import { closeModal } from './modal.js';

export const handleFormSubmit = (formData) => {
  const appointmentId = formData.get('editingAppointmentId');
  
  const appointmentData = {
    id: appointmentId ? parseInt(appointmentId) : sampleAppointments.length + 1,
    clientName: formData.get('clientName'),
    service: formData.get('services'),
    specialist: formData.get('specialist'),
    startTime: formData.get('selectedStartTime'),
    endTime: formData.get('selectedEndTime'),
    status: formData.get('bookingStatus') || 'დაგეგმილი',
    notes: formData.get('notes')
  };

  if (appointmentId) {
    // Update existing appointment
    const index = sampleAppointments.findIndex(a => a.id === parseInt(appointmentId));
    if (index !== -1) {
      sampleAppointments[index] = appointmentData;
    }
  } else {
    // Add new appointment
    sampleAppointments.push(appointmentData);
  }

  // Update UI
  updateCalendarEvents(sampleAppointments);
  renderTodayAppointments();
  closeModal();
};

export const validateForm = (formData) => {
  const errors = [];

  if (!formData.get('clientName')) {
    errors.push('კლიენტის სახელი აუცილებელია');
  }

  if (!formData.get('services')) {
    errors.push('სერვისის არჩევა აუცილებელია');
  }

  if (!formData.get('specialist')) {
    errors.push('სპეციალისტის არჩევა აუცილებელია');
  }

  if (!formData.get('selectedStartTime')) {
    errors.push('თარიღის და დროის არჩევა აუცილებელია');
  }

  return errors;
}; 