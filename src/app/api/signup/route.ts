import { createClientUser, findUserByEmail } from '@/lib/authUsers';

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    name?: string;
  };

  const email = body.email?.trim().toLowerCase() ?? '';
  const password = body.password ?? '';
  const name = body.name?.trim();

  if (!email || !password) {
    return Response.json(
      { message: 'Email and password are required.' },
      { status: 400 },
    );
  }

  if (password.length < 6) {
    return Response.json(
      { message: 'Password must be at least 6 characters.' },
      { status: 400 },
    );
  }

  if (findUserByEmail(email)) {
    return Response.json(
      { message: 'An account with this email already exists.' },
      { status: 409 },
    );
  }

  const user = createClientUser({ email, password, name });

  return Response.json(
    {
      user: {
        email: user.email,
        role: user.role,
      },
    },
    { status: 201 },
  );
}
