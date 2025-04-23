import { sampleAppointments } from './data.js';
import { formatTime, getClassNameFromStatus } from './utils.js';

export const renderTodayAppointments = () => {
  const appointmentsList = document.getElementById('todayAppointmentsList');
  const today = new Date().toISOString().split('T')[0];
  
  const todayAppointments = sampleAppointments.filter(appointment => 
    appointment.startTime.startsWith(today)
  );

  appointmentsList.innerHTML = todayAppointments.map(appointment => `
    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div class="flex items-center">
        <span class="text-gray-600">${formatTime(appointment.startTime)}</span>
        <span class="${getClassNameFromStatus(appointment.status)}">${appointment.status}</span>
      </div>
      <div class="flex items-center">
        <span class="text-gray-800 font-medium">${appointment.clientName}</span>
        <span class="text-gray-500 ml-2">${appointment.service}</span>
      </div>
      <div class="flex items-center">
        <button class="edit-icon text-blue-600 hover:text-blue-800">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="text-red-600 hover:text-red-800">
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');
};

export const updateMetrics = (metrics) => {
  document.getElementById('todayVisitsCount').textContent = metrics.visits;
  document.getElementById('todayIncome').textContent = `${metrics.todayIncome} ₾`;
  document.getElementById('monthIncome').textContent = `${metrics.monthIncome} ₾`;
}; 