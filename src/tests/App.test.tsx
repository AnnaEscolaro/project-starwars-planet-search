import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fetchPlanets from '../api/fetch-planets';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('São renderizados inputs, botão para adicionar filtro e dados da API', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  const nameInput = screen.getByPlaceholderText(/Nome do Planeta/i);
  const populationInput = screen.getByDisplayValue(/population/i);
  const operatorInput = screen.getByDisplayValue(/maior que/i);
  const numberInput = screen.getByDisplayValue(/0/i);
  const button = screen.getByRole('button', { name: /Adicionar Filtro/i });
  const tableTitle = screen.getByText(/Surface Water/i);
  expect(nameInput).toBeInTheDocument();
  expect(populationInput).toBeInTheDocument();
  expect(operatorInput).toBeInTheDocument();
  expect(numberInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).not.toBeDisabled();
  expect(tableTitle).toBeInTheDocument();
});

test('Se os filtros funcionam corretamente', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.type(screen.getByPlaceholderText(/Nome do Planeta/i), 'oo');
  expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
  expect(screen.getByText(/Naboo/i)).toBeInTheDocument();
  await userEvent.type((screen.getByDisplayValue(/0/i)), '200000');
  expect(screen.getByText(/Naboo/i)).toBeInTheDocument();
});

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });
