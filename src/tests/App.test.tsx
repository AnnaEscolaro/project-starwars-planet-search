import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fetchPlanets from '../api/fetch-planets';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('São renderizados inputs e botão para adicionar filtro', async () => {
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  const nameInput = screen.getByPlaceholderText(/Nome do Planeta/i);
  const populationInput = screen.getByDisplayValue(/population/i);
  const operatorInput = screen.getByDisplayValue(/maior que/i);
  const numberInput = screen.getByDisplayValue(/0/i);
  const button = screen.getByRole('button', { name: /Adicionar Filtro/i });
  expect(nameInput).toBeInTheDocument();
  expect(populationInput).toBeInTheDocument();
  expect(operatorInput).toBeInTheDocument();
  expect(numberInput).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(button).not.toBeDisabled();
});

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });
