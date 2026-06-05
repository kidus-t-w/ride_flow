export interface AuthUser {
  id: string;
  email: string;
  password: string;
  role: string;
  name?: string;
}

const users: AuthUser[] = [
  {
    id: 'admin',
    email: 'admin@carrental.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin',
  },
  {
    id: 'client',
    email: 'user@carrental.com',
    password: 'user123',
    role: 'client',
    name: 'Client',
  },
];

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const findUserByCredentials = (email: string, password: string) =>
  users.find(
    (user) =>
      user.email === normalizeEmail(email) && user.password === password,
  ) ?? null;

export const findUserByEmail = (email: string) =>
  users.find((user) => user.email === normalizeEmail(email)) ?? null;

export const createClientUser = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) => {
  const normalizedEmail = normalizeEmail(email);

  // TODO: Replace this in-memory mutation with a database-backed insert.
  const user: AuthUser = {
    id: `client-${Date.now()}`,
    email: normalizedEmail,
    password,
    role: 'client',
    name: name?.trim() || 'Client',
  };

  users.push(user);

  return user;
};
