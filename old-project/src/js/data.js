export const sampleAppointments = [
  {
    id: 1,
    clientName: 'გიორგი ბერიძე',
    service: 'თმის შეჭრა',
    specialist: 'ნინო ხარაბაძე',
    startTime: '2024-03-20T10:00:00',
    endTime: '2024-03-20T11:00:00',
    status: 'დაგეგმილი',
    notes: 'პირველი ვიზიტი'
  },
  {
    id: 2,
    clientName: 'მარიამ მაისურაძე',
    service: 'თმის დავარცხნა',
    specialist: 'ლევან ნაცვლიშვილი',
    startTime: '2024-03-20T14:00:00',
    endTime: '2024-03-20T15:00:00',
    status: 'შესრულებული',
    notes: ''
  }
];

export const specialistData = [
  { id: 1, name: 'ნინო ხარაბაძე', services: ['თმის შეჭრა', 'თმის დავარცხნა'] },
  { id: 2, name: 'ლევან ნაცვლიშვილი', services: ['თმის შეღებვა', 'თმის დავარცხნა'] }
]; 