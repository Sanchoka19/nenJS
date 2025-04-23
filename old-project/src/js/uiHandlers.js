import { openModal, closeModal } from './modal.js';
import { sampleAppointments } from './data.js';
import { populateModalForEdit } from './modal.js';

export const attachEventListeners = () => {
  // Hamburger menu
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const sidebar = document.getElementById('sidebar');
  
  hamburgerMenu?.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-open');
  });

  // New event button
  const addEventButton = document.getElementById('addEventButton');
  addEventButton?.addEventListener('click', () => {
    openModal('create');
  });

  // Modal close button
  const closeButton = document.querySelector('.close-button');
  closeButton?.addEventListener('click', closeModal);

  // Cancel button in modal
  const cancelButton = document.getElementById('cancelEventButton');
  cancelButton?.addEventListener('click', closeModal);

  // Edit icons in appointments list
  document.addEventListener('click', (e) => {
    if (e.target.closest('.edit-icon')) {
      const appointmentElement = e.target.closest('.flex.items-center.justify-between');
      const clientName = appointmentElement.querySelector('.text-gray-800').textContent;
      const appointment = sampleAppointments.find(a => a.clientName === clientName);
      
      if (appointment) {
        openModal('edit');
        populateModalForEdit(appointment);
      }
    }
  });

  // Form submission
  const newEventForm = document.getElementById('newEventForm');
  newEventForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form submission logic here
    closeModal();
  });
}; 