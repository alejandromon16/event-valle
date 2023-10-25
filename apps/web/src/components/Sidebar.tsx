import React, { useState } from 'react';
import { Box, IconButton, useDisclosure, Text, Stack, Image, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, AddIcon, SearchIcon, EmailIcon } from '@chakra-ui/icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isOpen: isMobileSidebarOpen, onToggle: onMobileSidebarToggle } = useDisclosure();
  const [activeNavItem, setActiveNavItem] = useState(''); // Initialize with an empty string

  const handleNavItemClick = (navItem: string) => {
    setActiveNavItem(navItem);
  };

  return (
    <Box
      as="aside"
      width={isOpen ? '250px' : '75px'}
      position="fixed"
      top="0"
      left="0"
      h="100%"
      bg="pink.800"
      boxShadow="2xl"
      zIndex={1000}
      transition="width 0.2s ease"
    >
      {/* Toggle Button for Mobile */}
      <IconButton
        display={{ sm: 'block', md: 'none' }}
        icon={isMobileSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        variant="ghost"
        color="white"
        aria-label="Toggle Sidebar"
        onClick={onMobileSidebarToggle}
        fontSize="24px"
      />

      {/* Logo and Title */}
      <Box p="4" mt="2">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Image src="/logo2.png" alt="logo" width="130px" />
        </Box>
      </Box>

      {/* Navigation Options */}
      <Stack spacing={4} mt="4">
        <Button
          leftIcon={<SearchIcon />}
          colorScheme="whiteAlpha"
          variant={activeNavItem === 'search' ? 'solid' : 'ghost'}
          onClick={() => handleNavItemClick('search')}
        >
          Usuarios
        </Button>
        <Button
          leftIcon={<EmailIcon />}
          colorScheme="whiteAlpha"
          variant={activeNavItem === 'email' ? 'solid' : 'ghost'}
          onClick={() => handleNavItemClick('email')}
        >
          Eventos
        </Button>
        <Button
          leftIcon={<AddIcon />}
          colorScheme="whiteAlpha"
          variant={activeNavItem === 'add' ? 'solid' : 'ghost'}
          onClick={() => handleNavItemClick('add')}
        >
          Solicitudes
        </Button>

        {/* Add more navigation options as needed */}
      </Stack>
    </Box>
  );
};

export default Sidebar;
