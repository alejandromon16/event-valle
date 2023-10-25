import React, { ReactNode } from 'react';
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
import '@fontsource/fira-sans';

interface LayoutProps {
  children: ReactNode;
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Fira sans', sans-serif`,
    body: `'Fira sans', sans-serif`,
  },
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset />
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
    </ChakraProvider>
  );
};

export default Layout;
