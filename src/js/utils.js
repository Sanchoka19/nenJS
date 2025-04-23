export const getClassNameFromStatus = (status) => {
  const statusMap = {
    'დაგეგმილი': 'status-დაგეგმილი',
    'შესრულებული': 'status-შესრულებული',
    'გაუქმებული': 'status-გაუქმებული',
    'გადავადებული': 'status-გადავადებული'
  };
  return statusMap[status] || '';
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('ka-GE', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diff = end - start;
  return Math.round(diff / (1000 * 60)); // Duration in minutes
}; 