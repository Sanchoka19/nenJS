import { renderTodayAppointments } from './domUpdates.js';
import { initCalendar } from './calendar.js';
import { initChart } from './chart.js';
import { initModal } from './modal.js';
import { initFlatpickr } from './flatpickrConfig.js';
import { attachEventListeners } from './uiHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
  initChart();
  initCalendar();
  initModal();
  initFlatpickr();
  renderTodayAppointments();
  attachEventListeners();
});
