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
  placa: z
    .string()
    .min(7, "Informe a placa")
    .regex(/^([A-Z]{3}[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/, {
      message: "Placa inválida. Use ABC1234 ou ABC1D23",
    }),
  horario: z.any().refine((value) => dayjs(value).isValid(), {
    message: "Informe um horário válido",
  }),
  cpf: z.string().min(14, "Informe um CPF válido"),
  nascimento: z.string().min(10, "Informe uma data válida"),
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
      cpf: "",
      nascimento: "",
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

      <Card sx={{ p: 4, mt: 2, borderRadius: 4, maxWidth: 1000 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Motorista"
              {...register("motorista")}
              error={!!errors.motorista}
              helperText={errors.motorista?.message}
            />

            <Controller
              name="placa"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Placa"
                  value={field.value}
                  onChange={(e) => {
                    let value = e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "");

                    value = value.slice(0, 7);

                    field.onChange(value);
                  }}
                  inputProps={{ maxLength: 7 }}
                  error={!!errors.placa}
                  helperText={errors.placa?.message ?? "Ex: ABC1234 ou ABC1D23"}
                />
              )}
            />

            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <TextField
                  label="CPF"
                  value={field.value}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d)/, "$1.$2")
                      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                    field.onChange(value);
                  }}
                  error={!!errors.cpf}
                  helperText={errors.cpf?.message}
                />
              )}
            />

            <Controller
              name="nascimento"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Data de Nascimento"
                  value={field.value}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "");
                    value = value
                      .replace(/(\d{2})(\d)/, "$1/$2")
                      .replace(/(\d{2})(\d)/, "$1/$2")
                      .replace(/(\d{4})(\d)/, "$1");
                    field.onChange(value);
                  }}
                  error={!!errors.nascimento}
                  helperText={errors.nascimento?.message}
                />
              )}
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
