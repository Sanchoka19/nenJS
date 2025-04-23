function Notifications() {
  const notifications = [
    {
      id: 1,
      text: 'დაბადების დღე: კლიენტი D (ხვალ).',
      action: 'შეთავაზება?'
    },
    {
      id: 2,
      text: 'დაბალი მარაგი: სერვისი X (დარჩა: 2)',
      action: 'შეკვეთა?'
    },
    {
      id: 3,
      text: 'ახალი შეტყობინება: კლიენტი B',
      action: 'პასუხი:'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">შეტყობინებები</h2>
      <div className="space-y-3">
        {notifications.map(notification => (
          <div key={notification.id} className="text-gray-700 text-sm">
            . {notification.text} <span className="text-custom-blue">{notification.action}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-custom-gray my-4"></div>
      <div className="text-center text-sm">
        <a href="#" className="text-custom-blue hover:underline">ყველა შეტყობინების ნახვა</a>
      </div>
    </div>
  );
}

export default Notifications; 