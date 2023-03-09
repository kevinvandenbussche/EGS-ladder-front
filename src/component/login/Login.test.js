import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from './Login.js';
import '@testing-library/jest-dom'

describe('Login', () => {
  it('renders login form', () => {
    const route = "/"
    render(
        <MemoryRouter initialEntries={[route]}>
            <Login/>
        </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    expect(passwordInput).toBeInTheDocument();
    const submitButton = screen.getByTestId('submit');
    waitFor(()=>expect(submitButton).toBeInTheDocument());
  });

  it('submits login form with valid data', async () => {
    const route = "/"
    render(
        <MemoryRouter initialEntries={[route]}>
            <Login/>
        </MemoryRouter>
    );
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);
  });

it('shows error message when password fails', async () => {  
    const route = "/"
    render(
        <MemoryRouter initialEntries={[route]}>
            <Login/>
        </MemoryRouter>
    );
    // Trouver les champs Email et Mot de passe
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    // Simuler la saisie d'un email et d'un mot de passe
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pa' } });
    // Trouver le bouton de soumission
    const submitButton = screen.getByTestId('submit');
    // Cliquer sur le bouton de soumission
    fireEvent.click(submitButton);
    // Attendre que l'erreur s'affiche à l'écran
    await waitFor(() =>
      screen.findByText('*le mot de passe doit contenir au moins 6 caractères', { selector: 'p' })
    );
    // Vérifier que l'erreur est bien présente à l'écran
    expect(
      screen.getByText('*le mot de passe doit contenir au moins 6 caractères', { selector: 'p' })
    ).toBeInTheDocument();
  });

  it('shows error message when email fails', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    fireEvent.change(emailInput, { target: { value: 'testexample.com' } });
    fireEvent.change(passwordInput, { target: { value: 'paswword' } });
    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);
    await waitFor(() =>
      screen.findByText('*le mail n\'est pas correct', { selector: 'p' })
    );
    expect(
      screen.getByText('*le mail n\'est pas correct', { selector: 'p' })
    ).toBeInTheDocument();
  });

  it('shows error message when email and password fails', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () =>
        Promise.resolve({
          error: 'Invalid email or password',
        }),
    });
  
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });
    const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
    fireEvent.change(emailInput, { target: { value: 'testexample.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pas' } });
    const submitButton = screen.getByTestId('submit');
    fireEvent.click(submitButton);
    await waitFor(() =>
      screen.findByText('*le mail n\'est pas correct', { selector: 'p' })
    );
    await waitFor(() =>
      screen.findByText('*le mot de passe doit contenir au moins 6 caractères', { selector: 'p' })
    );
    expect(
      screen.getByText('*le mail n\'est pas correct', { selector: 'p' })
    ).toBeInTheDocument();
    expect(
        screen.getByText('*le mot de passe doit contenir au moins 6 caractères', { selector: 'p' })
    ).toBeInTheDocument();

  });
});
