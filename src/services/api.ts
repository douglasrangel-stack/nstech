const API_URL = "http://localhost:3001/agendamentos";

export const fetchAgendamentos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createAgendamento = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
