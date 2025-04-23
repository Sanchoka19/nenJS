export const getClassNameFromStatus = (status) => {
  const statusMap = {
    'დაგეგმილი': 'bg-blue-100 text-blue-800',
    'შესრულებული': 'bg-green-100 text-green-800',
    'გაუქმებული': 'bg-red-100 text-red-800',
    'გადავადებული': 'bg-yellow-100 text-yellow-800'
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
}; 