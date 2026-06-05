import LoginClient from '@/components/auth/LoginClient';
import { Suspense } from 'react';


interface PageProps {
  searchParams: Promise<{ error?: string }> | { error?: string };
}

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const hasCredentialsError = params.error === 'CredentialsSignin';

  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <LoginClient hasCredentialsError={hasCredentialsError} />
    </Suspense>
  );
}