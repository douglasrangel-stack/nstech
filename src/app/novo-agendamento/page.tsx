"use client";

import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dayjs from "dayjs";

import { createAgendamento } from "@/services/api";

const agendamentoSchema = z.object({
  motorista: z.string().min(1, "Informe o nome do motorista"),
  placa: z.string().min(1, "Informe a placa"),
  horario: z.any().refine((value) => dayjs(value).isValid(), {
    message: "Informe um horário válido",
  }),
});

type FormData = z.infer<typeof agendamentoSchema>;

export default function NovoAgendamentoPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(agendamentoSchema),
    defaultValues: {
      motorista: "",
      placa: "",
      horario: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      horario: dayjs(data.horario).format("HH:mm"),
    };

    await createAgendamento(payload);

    router.push("/");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Typography variant="h4" gutterBottom color="text.primary">
        Novo Agendamento
      </Typography>

      <Card sx={{ p: 4, mt: 2, borderRadius: 4, maxWidth: 500 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Motorista"
              {...register("motorista")}
              error={!!errors.motorista}
              helperText={errors.motorista?.message}
            />
            <TextField
              label="Placa"
              {...register("placa")}
              error={!!errors.placa}
              helperText={errors.placa?.message}
            />
            <Controller
              name="horario"
              control={control}
              render={({ field }) => (
                <TimePicker
                  label="Horário"
                  value={field.value}
                  onChange={field.onChange}
                  slotProps={{
                    textField: {
                      error: !!errors.horario,
                      helperText: errors.horario?.message as string,
                    },
                  }}
                />
              )}
            />

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
              <Button type="submit" variant="contained">
                Salvar
              </Button>
            </Box>
          </Stack>
        </form>
      </Card>
    </LocalizationProvider>
  );
}
