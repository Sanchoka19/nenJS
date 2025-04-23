import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function MetricsChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
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
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">დღის მეტრიკა (გრაფი)</h2>
      <div className="relative h-64">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mt-4">
        <div>
          <p>შემოსავალი</p>
          <p className="text-green-600 font-semibold">1850 ₾</p>
        </div>
        <div>
          <p>ხარჯი</p>
          <p className="text-red-600 font-semibold">350 ₾</p>
        </div>
        <div>
          <p>წმინდა მოგება</p>
          <p className="text-blue-600 font-semibold">7200 ₾</p>
        </div>
      </div>
    </div>
  );
}

export default MetricsChart; 