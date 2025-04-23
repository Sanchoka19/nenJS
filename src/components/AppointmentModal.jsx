import { useState, useEffect } from 'react';
import { specialistData } from '../data/specialists';

function AppointmentModal({ mode, appointment, onClose }) {
  const [formData, setFormData] = useState({
    clientName: '',
    service: '',
    specialist: '',
    startTime: '',
    endTime: '',
    status: 'დაგეგმილი',
    notes: ''
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        clientName: appointment.clientName,
        service: appointment.service,
        specialist: appointment.specialist,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        notes: appointment.notes
      });
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateTimeChange = (e) => {
    const startTime = e.target.value;
    const endTime = new Date(new Date(startTime).getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    
    setFormData(prev => ({
      ...prev,
      startTime,
      endTime
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'create' ? 'ახალი ჯავშნის დამატება' : 'ჯავშნის რედაქტირება'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-500 mb-1">კლიენტი</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              required
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-500 mb-1">სერვისი</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              required
            >
              <option value="">აირჩიეთ სერვისი</option>
              <option value="თმის შეჭრა">თმის შეჭრა</option>
              <option value="თმის დავარცხნა">თმის დავარცხნა</option>
              <option value="თმის შეღებვა">თმის შეღებვა</option>
            </select>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label htmlFor="specialist" className="block text-sm font-medium text-gray-500 mb-1">სპეციალისტი</label>
            <select
              id="specialist"
              name="specialist"
              value={formData.specialist}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              required
            >
              <option value="">აირჩიეთ სპეციალისტი</option>
              {specialistData.map(specialist => (
                <option key={specialist.id} value={specialist.name}>
                  {specialist.name}
                </option>
              ))}
            </select>
          </div>

          {mode === 'edit' && (
            <div className="bg-gray-50 rounded-lg p-4">
              <label htmlFor="status" className="block text-sm font-medium text-gray-500 mb-1">ჯავშნის სტატუსი</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              >
                <option value="დაგეგმილი">დაგეგმილი</option>
                <option value="შესრულებული">შესრულებული</option>
                <option value="გაუქმებული">გაუქმებული</option>
                <option value="გადავადებული">გადავადებული</option>
              </select>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-500 mb-1">თარიღი და დრო</label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleDateTimeChange}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              required
            />
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-500 mb-1">შენიშვნები</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>გაუქმება</span>
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{mode === 'create' ? 'დამატება' : 'შენახვა'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentModal; 