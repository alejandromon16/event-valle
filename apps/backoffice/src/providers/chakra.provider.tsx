'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ChakraProvidersProps {
  children: ReactNode;
}

export function ChakraProviders({ children}: ChakraProvidersProps) {
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
