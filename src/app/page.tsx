import moment from 'moment';

export default function TruckScheduleList() {
  const schedules = [
    { id: 1, truck: 'AAA1234', time: '08:00 AM' },
    { id: 2, truck: 'BBB2345', time: '10:00 AM' },
    { id: 3, truck: 'CCC3456', time: '02:00 PM' },
  ];

  return (
    <div>
      <h1>Lista de Agendamentos</h1>
      <ul>
        {schedules.map(schedule => (
          <li key={schedule.id}>
            {schedule.truck} - {moment(schedule.time, 'hh:mm A').format('HH:mm')}
          </li>
        ))}
      </ul>
    </div>
  );
}