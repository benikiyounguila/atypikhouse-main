import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '@/providers/UserProvider';
import AccountNav from '../components/ui/AccountNav';

describe('AccountNav Component', () => {
  const renderWithContext = (user) => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user }}>
          <AccountNav />
        </UserContext.Provider>
      </BrowserRouter>,
    );
  };

  test('affiche tous les liens de navigation pour un utilisateur classique ', () => {
    renderWithContext({ isAdmin: false, role: 'user' });

    expect(
      screen.getByRole('link', { name: /My Profile/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /My bookings/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /My accommodations/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /Admin Dashboard/i }),
    ).not.toBeInTheDocument();
  });

  test('affiche le lien du tableau de bord admin pour un utilisateur admin', () => {
    renderWithContext({ isAdmin: true, role: 'admin' });

    expect(
      screen.getByRole('link', { name: /Admin Dashboard/i }),
    ).toBeInTheDocument();
  });

  test('affiche le lien du tableau de bord modérateur pour un utilisateur modérateurr', () => {
    renderWithContext({ isAdmin: false, role: 'modérateur' }); // Rôle correct
    expect(
      screen.getByRole('link', { name: /Moderator Dashboard/i }),
    ).toBeInTheDocument();
  });

  test('applique les bonnes classes CSS en fonction de la sous-page actuelle', () => {
    renderWithContext({ isAdmin: false, role: 'user' });

    const profileLink = screen.getByRole('link', { name: /My Profile/i });
    expect(profileLink).toHaveClass('bg-primary text-white');
    const bookingsLink = screen.getByRole('link', { name: /My bookings/i });
    expect(bookingsLink).toHaveClass('bg-gray-200');
  });
});
