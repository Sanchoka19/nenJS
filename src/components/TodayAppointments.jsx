import { useState } from 'react';
import { formatTime } from '../utils/dateUtils';
import { getClassNameFromStatus } from '../utils/statusUtils';

function TodayAppointments({ appointments, onEditAppointment, onDeleteAppointment }) {
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [paidAppointments, setPaidAppointments] = useState(new Set());
  const [showAll, setShowAll] = useState(false);

  const handleAppointmentClick = (appointment) => {
    setExpandedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setExpandedAppointment(null);
  };

  const handleDelete = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      onDeleteAppointment(appointmentId);
      if (expandedAppointment?.id === appointmentId) {
        handleCloseDetails();
      }
    }
  };

  const handlePayment = (appointment) => {
    if (!paidAppointments.has(appointment.id)) {
      setPaidAppointments(prev => new Set([...prev, appointment.id]));
      handleCloseDetails();
    }
  };

  const handleToggleView = () => {
    setShowAll(prev => !prev);
  };

  const displayedAppointments = showAll ? appointments : appointments.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">დღევანდელი ჯავშნები</h2>
        <p className="text-gray-600">სულ {appointments.length} ჯავშანი დღეს</p>
      </div>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">დღევანდელი ჯავშნები არ არის</p>
        ) : (
          <>
            <div className={`${showAll ? 'max-h-[500px]' : ''} overflow-y-auto pr-2`}>
              {displayedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors mb-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{appointment.clientName}</p>
                      <p className="text-sm text-gray-500">{appointment.service}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        {formatTime(appointment.startTime)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getClassNameFromStatus(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Eye icon for details */}
                      <button
                        onClick={() => handleAppointmentClick(appointment)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="ჯავშნის დეტალები"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>

                      {/* Pencil icon for edit */}
                      <button
                        onClick={() => onEditAppointment(appointment)}
                        className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
                        title="რედაქტირება"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      {/* Payment status icon */}
                      <button
                        className={`p-1 transition-colors ${
                          paidAppointments.has(appointment.id)
                            ? 'text-green-600 hover:text-green-700' 
                            : 'text-red-600 hover:text-red-700'
                        }`}
                        title={paidAppointments.has(appointment.id) ? 'გადახდილი' : 'გადაუხდელი'}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {appointments.length > 5 && (
              <button
                onClick={handleToggleView}
                className="w-full py-2 text-blue-600 hover:text-blue-800 transition-colors border-t border-gray-200"
              >
                {showAll ? 'დამალვა' : 'ყველას ნახვა'}
              </button>
            )}
          </>
        )}
      </div>

      {/* Appointment Details Modal */}
      {expandedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">ჯავშნის დეტალები</h3>
              <button
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">კლიენტი</p>
                <p className="text-lg font-semibold text-gray-800">{expandedAppointment.clientName}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">სერვისი</p>
                <p className="text-lg font-semibold text-gray-800">{expandedAppointment.service}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">დრო</p>
                <p className="text-lg font-semibold text-gray-800">{formatTime(expandedAppointment.startTime)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">სტატუსი</p>
                <p className={`text-lg font-semibold ${getClassNameFromStatus(expandedAppointment.status)}`}>
                  {expandedAppointment.status}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">შენიშვნა</p>
                <p className="text-lg text-gray-800">{expandedAppointment.notes || 'შენიშვნა არ არის'}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end space-x-4">
              {!paidAppointments.has(expandedAppointment.id) && (
                <button
                  onClick={() => handlePayment(expandedAppointment)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>გადახდა</span>
                </button>
              )}
              <button
                onClick={() => handleDelete(expandedAppointment.id)}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center space-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>წაშლა</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodayAppointments; 