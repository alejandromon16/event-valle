import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client from '@/config/apollo-client';
import { ChakraProvider, extendTheme, Heading, Text } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@fontsource/fira-sans';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticate)

  useEffect(() => {
    if(!isAuthenticated){
      router.push('/');
    }
  },[isAuthenticated])

  const customTheme = extendTheme({
    
  });

  return (
    <ApolloProvider client={client}>
      <CacheProvider>
        <ChakraProvider theme={customTheme}>
          <Component />
        </ChakraProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}
