"use client";

import { useState } from 'react';

export default function TruckRegistration() {
  const [truck, setTruck] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Caminhão ${truck} agendado para ${time}`);
    setTruck('');
    setTime('');
  };

  return (
    <div>
      <h1>Novo Agendamento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Placa:</label>
          <input
            type="text"
            value={truck}
            onChange={(e) => setTruck(e.target.value)}
          />
        </div>
        <div>
          <label>Horário:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}