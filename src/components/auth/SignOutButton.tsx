'use client';

import { signOut } from 'next-auth/react';

export const SignOutButton = () => (
  <button type="button" onClick={() => void signOut({ redirectTo: '/login' })}>
    Sign Out
  </button>
);
