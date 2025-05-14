"use client";

import { useEffect, useState } from "react";
import { fetchAgendamentos } from "../services/api";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
} from "@mui/material";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    fetchAgendamentos().then(setAgendamentos);
  }, []);

  type Agendamento = {
    id: string | number;
    motorista: string;
    placa: string;
    horario: string;
    cpf: string;
    nascimento: string;
  };

  return (
    <>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Agendamentos
      </Typography>
      <TableContainer
        component={Paper}
        elevation={1}
        sx={{ borderRadius: 6, p: 2, maxWidth: 1000 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                Motorista
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", py: 2 }}>Placa</TableCell>
              <TableCell sx={{ fontWeight: "bold", py: 2 }}>CPF</TableCell>
              <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                Data de Nascimento
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", py: 2 }}>Horário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map((item: Agendamento) => (
              <TableRow key={item.id}>
                <TableCell>{item.motorista}</TableCell>
                <TableCell>{item.placa}</TableCell>
                <TableCell>{item.cpf}</TableCell>
                <TableCell>{item.nascimento}</TableCell>
                <TableCell>{item.horario}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
