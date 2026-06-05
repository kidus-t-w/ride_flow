import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByCredentials } from '@/lib/authUsers';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials) {
        const email = String(credentials?.email ?? '');
        const password = String(credentials?.password ?? '');

        const user = findUserByCredentials(email, password);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && 'role' in user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },

    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const path = request.nextUrl.pathname;


      const isPublicPath = path === '/' || path.startsWith('/blog') || path === '/faq' || path === '/login' || path === '/signup';
      if (isPublicPath) return true;

      if (!isLoggedIn) {
        return false; 
      }

      if (path.startsWith('/admin')) {
        return auth.user.role === 'admin';
      }

      if (path.startsWith('/dashboard')) {
        return true;
      }

      return true;
    },
  },
});