import { Suspense } from 'react';
import LoginClient from '@/components/auth/LoginClient';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}