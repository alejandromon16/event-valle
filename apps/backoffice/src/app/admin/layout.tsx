'use client'
import Header from '@/src/components/Header';
import Sidebar from '@/src/components/Sidebar';
import { EdgeStoreProvider } from '@/src/lib/edgestore';
import { useAuthStore } from '@/src/stores/authStore';
import { Box, Flex } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const authStore = useAuthStore();
  const path = usePathname();
  const activeNavItem = path.split('/')[2];

  return (
    <EdgeStoreProvider>
      <Box display="flex" minHeight="100vh">
        {/* Sidebar Component */}
        <Sidebar isOpen={true} onClose={() => {}} router={router} activeNavItem={activeNavItem} />

        <Flex paddingLeft="250px" flex="1" flexDirection="column">
          {/* Header Component */}
          <Header onLogout={() => { console.log('should logout'); }} router={router} />

          {/* Main Content */}
          <Box zIndex="0" flex="1" p="4" overflowY="auto" position="relative">
            {children}
          </Box>
        </Flex>
      </Box>
    </EdgeStoreProvider>
  );
};
