import Chart from 'chart.js/auto';

let metricsChart;

export const initChart = () => {
  const ctx = document.getElementById('metricsChart').getContext('2d');
  
  metricsChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
      datasets: [
        {
          label: 'შემოსავალი',
          data: [150, 200, 180, 250, 300, 280, 320, 350, 400, 380],
          borderColor: '#22c55e',
          tension: 0.4
        },
        {
          label: 'ხარჯი',
          data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
          borderColor: '#ef4444',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
};

export const updateChartData = (newData) => {
  if (metricsChart) {
    metricsChart.data.datasets[0].data = newData.income;
    metricsChart.data.datasets[1].data = newData.expenses;
    metricsChart.update();
  }
}; 