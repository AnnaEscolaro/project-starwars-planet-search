import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import fetchPlanets from '../api/fetch-planets';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { MockFetch } from './mock/mockFetch';
import { vi } from 'vitest';

test('São renderizados inputs, botão para adicionar filtro e dados da API', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
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
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.type(screen.getByPlaceholderText(/Nome do Planeta/i), 'oo');
  expect(screen.getByText(/Naboo/i)).toBeInTheDocument();
  await userEvent.type((screen.getByDisplayValue(/0/i)), '200000');
  expect(screen.getByText(/Naboo/i)).toBeInTheDocument();
});

test('Se após apagar o texto digitado são exibidos todos os planetas', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.type(screen.getByPlaceholderText(/Nome do Planeta/i), 'oo');
  await userEvent.clear(screen.getByPlaceholderText(/Nome do Planeta/i));
  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(11);
});

test('Se ocorre o filtro pelo operador maior que', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
  await userEvent.type(screen.getByTestId('value-filter'), '200000');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(7);
});

test('Se ocorre o filtro pelo operador menor que', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
  await userEvent.type(screen.getByTestId('value-filter'), '200000');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(2);
});

test('Se ocorre o filtro pelo operador igual a', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  await userEvent.type(screen.getByTestId('value-filter'), '24');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(4);
});

test('Se o botão de resetar todas as filtragens funciona corretamente', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  await userEvent.type(screen.getByTestId('value-filter'), '24');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(4);
  await userEvent.click(screen.getByRole('button', { name: /Remover todas filtragens/i }));
  const tableLines2 = screen.getAllByRole('row');
  expect(tableLines2).toHaveLength(11);
});

test('Se o botão de resetar todas as filtragens individualmente funciona corretamente - operador maior que', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
  await userEvent.type(screen.getByTestId('value-filter'), '200000');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(7);

  const removeButtons = screen.getByRole('button', { name: /Remover Filtro/i });
  
  await userEvent.click(removeButtons);
  const tableLines2 = screen.getAllByRole('row');
  expect(tableLines2).toHaveLength(11);
});

test('Se o botão de resetar todas as filtragens individualmente funciona corretamente - operador menor que', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
  await userEvent.type(screen.getByTestId('value-filter'), '500');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  const tableLinesNew = screen.getAllByRole('row');
  expect(tableLinesNew).toHaveLength(8);
  
  const removeButton2 = screen.getByRole('button', { name: /Remover Filtro/i });
  await userEvent.click(removeButton2);
  const tableLines3 = screen.getAllByRole('row');
  expect(tableLines3).toHaveLength(11);
});

test('Se o botão de resetar todas as filtragens individualmente funciona corretamente - operador igual a', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  await userEvent.type(screen.getByTestId('value-filter'), '4900');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(2);
  
  const removeButton2 = screen.getByRole('button', { name: /Remover Filtro/i });
  await userEvent.click(removeButton2);
  const tableLines3 = screen.getAllByRole('row');
  expect(tableLines3).toHaveLength(11);
});

test('Se a exclusão de um filtro mantém os outros aplicados - maior que', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
  await userEvent.type(screen.getByTestId('value-filter'), '200000');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));

  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  await userEvent.type(screen.getByTestId('value-filter'), '4900');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  
  const removeButton = screen.getAllByRole('button', { name: /Remover Filtro/i });
  await userEvent.click(removeButton[1]);

  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(7);
});

test('Se a exclusão de um filtro mantém os outros aplicados', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
  await userEvent.type(screen.getByTestId('value-filter'), '200000');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));

  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  await userEvent.type(screen.getByTestId('value-filter'), '4900');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  
  const removeButton = screen.getAllByRole('button', { name: /Remover Filtro/i });
  await userEvent.click(removeButton[1]);

  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(2);
});

test('Se a exclusão de um filtro mantém os outros aplicados', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: async () => MockFetch,
  });
  render(<App />);
  await waitFor(() => expect(screen.getByPlaceholderText(/Nome do Planeta/i)).toBeInTheDocument(), {
    timeout: 6000,
  });
  
  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  await userEvent.type(screen.getByTestId('value-filter'), '200000');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));

  await userEvent.selectOptions(screen.getByTestId('column-filter'), 'diameter');
  await userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
  await userEvent.type(screen.getByTestId('value-filter'), '4900');
  await userEvent.click(screen.getByRole('button', { name: /Adicionar Filtro/i }));
  
  const removeButton = screen.getAllByRole('button', { name: /Remover Filtro/i });
  await userEvent.click(removeButton[1]);

  const tableLines = screen.getAllByRole('row');
  expect(tableLines).toHaveLength(2);
});
