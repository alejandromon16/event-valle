"use client"
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Fira_Sans, Roboto, Yantramanav  } from 'next/font/google'
import React from 'react';
import ReactQueryProviders from '../providers/query.provider';
import { useAuthStore } from '../stores/authStore';
import "@uploadthing/react/styles.css";

const firaSans = Fira_Sans({
   weight: ['100','200','300','400','500','600','700','800','900'],
   subsets: ['latin'],
   display: 'auto',
   style: 'normal'
})

const font = Yantramanav({
  weight: '400',
  style: 'normal',
  subsets: ["latin"]
})

const roboto = Roboto({
  weight: '100',
  display: 'auto',
  subsets: ['latin'],
  style: 'normal'
})

interface ProviderProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProviderProps) => {

  const theme = extendTheme({
    fonts: {
      heading: font.style.fontFamily,
      body: font.style.fontFamily
    },
  })

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
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
