import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import NovoAgendamentoPage from "./page";
import { createAgendamento } from "@/services/api";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/api", () => ({
  createAgendamento: jest.fn(),
}));

describe("NovoAgendamentoPage", () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it("renderiza o formulário corretamente", () => {
    render(<NovoAgendamentoPage />);

    expect(screen.getByText("Novo Agendamento")).toBeInTheDocument();
    expect(screen.getByLabelText(/Motorista/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Placa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Horário/i)).toBeInTheDocument();
    expect(screen.getByText("Voltar")).toBeInTheDocument();
    expect(screen.getByText("Salvar")).toBeInTheDocument();
  });

  it("exibe mensagens de erro para campos obrigatórios", async () => {
    render(<NovoAgendamentoPage />);

    const submitButton = screen.getByText("Salvar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Informe o nome do motorista")
      ).toBeInTheDocument();
      expect(screen.getByText(/Informe a placa/i)).toBeInTheDocument();
      expect(screen.getByText(/Informe um CPF válido/i)).toBeInTheDocument();
      expect(screen.getByText(/Informe uma data válida/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Informe um horário válido/i)
      ).toBeInTheDocument();
    });
  });

  it("valida formato da placa corretamente", async () => {
    render(<NovoAgendamentoPage />);

    const placaInput = screen.getByLabelText(/Placa/i);
    await userEvent.type(placaInput, "PCD4698");

    const submitButton = screen.getByText("Salvar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Placa inválida/i)).toBeInTheDocument();
    });

    await userEvent.clear(placaInput);
    await userEvent.type(placaInput, "PCD4698");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Placa inválida/i)).not.toBeInTheDocument();
    });

    await userEvent.clear(placaInput);
    await userEvent.type(placaInput, "PCD4698");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText(/Placa inválida/i)).not.toBeInTheDocument();
    });
  });

  it("formata CPF corretamente", async () => {
    render(<NovoAgendamentoPage />);

    const cpfInput = screen.getByLabelText(/CPF/i);
    await userEvent.type(cpfInput, "07153980407");

    expect(cpfInput).toHaveValue("071.539.804-07");
  });

  it("formata data de nascimento corretamente", async () => {
    render(<NovoAgendamentoPage />);

    const nascimentoInput = screen.getByLabelText(/Data de Nascimento/i);
    await userEvent.type(nascimentoInput, "03111991");

    expect(nascimentoInput).toHaveValue("03/11/1991");
  });

  it("navega para página anterior ao clicar em voltar", async () => {
    render(<NovoAgendamentoPage />);

    const voltarButton = screen.getByText("Voltar");
    fireEvent.click(voltarButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it("envia o formulário com dados válidos e redireciona", async () => {
    render(<NovoAgendamentoPage />);

    await userEvent.type(screen.getByLabelText(/Motorista/i), "João Silva");
    await userEvent.type(screen.getByLabelText(/Placa/i), "PCD4698");
    await userEvent.type(screen.getByLabelText(/CPF/i), "07153980407");
    await userEvent.type(
      screen.getByLabelText(/Data de Nascimento/i),
      "03111991"
    );

    const timeInput = screen.getByLabelText(/Horário/i);

    fireEvent.change(timeInput, { target: { value: "14:30" } });

    const submitButton = screen.getByText("Salvar");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createAgendamento).toHaveBeenCalledWith(
        expect.objectContaining({
          motorista: "João Silva",
          placa: "PCD4698",
          cpf: "071.539.804-07",
          nascimento: "03/11/1991",
          horario: expect.any(String),
        })
      );
      expect(mockRouter.push).toHaveBeenCalledWith("/");
    });
  });
});
