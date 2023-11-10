'use client'
import React, { ReactNode, useEffect } from 'react';
import {
  ChakraProvider,
  CSSReset,
  Box,
  extendTheme,
  ColorModeScript,
  Flex,
} from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <Box display="flex" minHeight="100vh">
        {/* Sidebar Component */}
        <Sidebar isOpen={true} onClose={() => {}} />

        <Flex paddingLeft="250px" flex="1" flexDirection="column">
          {/* Header Component */}
          <Header onLogout={() => {console.log('should logout')}} />

          {/* Main Content */}
          <Box zIndex="0" flex="1" p="4" overflow="hidden">
            {children}
          </Box>
        </Flex>
      </Box>
  );
};

export default Layout;
