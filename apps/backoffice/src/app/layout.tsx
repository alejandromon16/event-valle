"use client"
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Fira_Sans } from 'next/font/google'
import React from 'react';
import ReactQueryProviders from '../providers/query.provider';
import { useAuthStore } from '../stores/authStore';

const firaSans = Fira_Sans({
   weight: ['100','200','300','400','500','600','700','800','900'],
   subsets: ['latin'],
   display: 'auto',
   style: 'normal'
})

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
  return (
    <CacheProvider>
      <ChakraProvider>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
              <ReactQueryProviders>
                <Providers>
                  {children}
                </Providers>
              </ReactQueryProviders>
        </body>
      </html>
  )
}
