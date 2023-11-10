import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import React from 'react'

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> =({children}) => {
  const isAuth = useAuthStore((state) => state.isAuthenticate)
  const router = useRouter()

  if(!isAuth){
    router.replace('/');
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default RootLayout
