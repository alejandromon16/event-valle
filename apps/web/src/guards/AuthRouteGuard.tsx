import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/authStore';


interface AuthRouteGuardProps {
  children: ReactNode;
}

const AuthRouteGuard: React.FC<AuthRouteGuardProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticate);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect unauthenticated users to the login page
      router.push('/');
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default AuthRouteGuard;
