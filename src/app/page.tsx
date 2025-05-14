"use client";

import { useEffect, useState } from "react";
import {
  fetchAgendamentos,
  deleteAgendamento,
  Agendamento,
} from "../services/api";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] =
    useState<Agendamento | null>(null);

  useEffect(() => {
    const carregarAgendamentos = async () => {
      const data = await fetchAgendamentos();
      if (!data) {
        setShowErrorDialog(true);
      } else {
        setAgendamentos(data);
      }
      setLoading(false);
    };

    carregarAgendamentos();
  }, []);

  const handleDelete = async () => {
    if (selectedAgendamento) {
      try {
        await deleteAgendamento(selectedAgendamento.id!);
        setAgendamentos((prev) =>
          prev.filter((a) => a.id !== selectedAgendamento.id)
        );
        handleCloseDialog();
      } catch (err) {
        console.error("Erro ao excluir:", err);
      }
    }
  };

  const handleOpenDialog = (agendamento: Agendamento) => {
    setSelectedAgendamento(agendamento);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAgendamento(null);
  };

  return (
    <>
      <Typography variant="h4" color="text.primary" gutterBottom>
        Agendamentos
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {agendamentos.length === 0 ? (
            <Typography
              variant="h6"
              color="text.secondary"
              align="left"
              sx={{ mt: 4 }}
            >
              Nenhum agendamento encontrado.
            </Typography>
          ) : (
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
                    <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                      Placa
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                      CPF
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                      Data de Nascimento
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", py: 2 }}>
                      Horário
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold", py: 2 }}
                      align="center"
                    >
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agendamentos.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.motorista}</TableCell>
                      <TableCell>{item.placa}</TableCell>
                      <TableCell>{item.cpf}</TableCell>
                      <TableCell>{item.nascimento}</TableCell>
                      <TableCell>{item.horario}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Você tem certeza que deseja excluir este agendamento?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showErrorDialog}>
        <DialogTitle>Sistema em manutenção</DialogTitle>
        <DialogContent>
          <Typography>
            No momento não foi possível carregar os dados. Tente novamente mais
            tarde.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowErrorDialog(false)} autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
