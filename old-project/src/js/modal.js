import { specialistData } from './data.js';

const modal = document.getElementById('newEventModal');
const modalTitle = document.getElementById('modalTitle');
const bookingStatusContainer = document.getElementById('bookingStatusContainer');
const specialistSelect = document.getElementById('specialist');

export const initModal = () => {
  populateSpecialistSelect();
};

export const openModal = (mode = 'create') => {
  modalTitle.textContent = mode === 'create' ? 'ახალი ჯავშნის დამატება' : 'ჯავშნის რედაქტირება';
  bookingStatusContainer.style.display = mode === 'edit' ? 'block' : 'none';
  modal.style.display = 'flex';
};

export const closeModal = () => {
  modal.style.display = 'none';
  document.getElementById('newEventForm').reset();
};

export const populateModalForEdit = (appointment) => {
  document.getElementById('clientName').value = appointment.clientName;
  document.getElementById('services').value = appointment.service;
  document.getElementById('specialist').value = appointment.specialist;
  document.getElementById('bookingStatus').value = appointment.status;
  document.getElementById('notes').value = appointment.notes;
  document.getElementById('editingAppointmentId').value = appointment.id;
};

const populateSpecialistSelect = () => {
  specialistSelect.innerHTML = '<option value="">აირჩიეთ სპეციალისტი</option>';
  specialistData.forEach(specialist => {
    const option = document.createElement('option');
    option.value = specialist.name;
    option.textContent = specialist.name;
    specialistSelect.appendChild(option);
  });
}; 