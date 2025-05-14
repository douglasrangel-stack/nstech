const API_URL = "http://localhost:3001/agendamentos";

export type Agendamento = {
  id?: string | number;
  motorista: string;
  placa: string;
  horario: string;
  cpf: string;
  nascimento: string;
};

export const fetchAgendamentos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createAgendamento = async (data: Agendamento) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateAgendamento = async (
  id: string | number,
  data: Agendamento
) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteAgendamento = async (id: string | number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao excluir agendamento");
  return true;
};
