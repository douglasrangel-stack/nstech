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
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export const createAgendamento = async (data: Agendamento) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export const updateAgendamento = async (
  id: string | number,
  data: Agendamento
) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

export const deleteAgendamento = async (id: string | number) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch {
    return false;
  }
};
