'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react';
import { ReactNode } from 'react'

interface ReactQueryProvidersProps {
  children: ReactNode;
}

export default function ReactQueryProviders({ children }: ReactQueryProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
