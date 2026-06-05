// lib/auth/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth(Component: React.ComponentType, allowedRoles?: string[]) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const userRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;

    useEffect(() => {
      if (!token) router.push('/login');
      else if (allowedRoles && !allowedRoles.includes(userRole || '')) router.push('/unauthorized');
    }, [token, userRole]);

    if (!token) return null;
    return <Component {...props} />;
  };
}