import { render, screen, fireEvent } from '@testing-library/react';
import TruckRegistration from './page';

describe('TruckRegistration Component', () => {
  it('renderiza corretamente', () => {
    render(<TruckRegistration />);
    expect(screen.getByText('Novo Agendamento')).toBeInTheDocument();
    expect(screen.getByLabelText('Placa:')).toBeInTheDocument();
    expect(screen.getByLabelText('Horário:')).toBeInTheDocument();
    expect(screen.getByText('Registrar')).toBeInTheDocument();
  });

  it('exibe uma mensagem após o envio do formulário', () => {
    render(<TruckRegistration />);

    const truckInput = screen.getByLabelText('Placa:');
    const timeInput = screen.getByLabelText('Horário:');
    const submitButton = screen.getByText('Registrar');

    fireEvent.change(truckInput, { target: { value: 'ABC-1234' } });
    fireEvent.change(timeInput, { target: { value: '10:00' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Caminhão ABC-1234 agendado para 10:00')).toBeInTheDocument();
  });
});