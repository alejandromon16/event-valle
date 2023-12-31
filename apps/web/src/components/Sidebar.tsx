import React, { useState } from 'react';
import { Box, IconButton, useDisclosure, Text, Stack, Image, Button, useColorMode } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, AddIcon, SearchIcon, EmailIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';
import { RoleType } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { isOpen: isMobileSidebarOpen, onToggle: onMobileSidebarToggle } = useDisclosure();
  const [activeNavItem, setActiveNavItem] = useState(''); // Initialize with an empty string
  const { colorMode } = useColorMode();
  const router = useRouter();

  const handleNavItemClick = (navItem: string) => {
    setActiveNavItem(navItem);
    router.replace(`/admin/${navItem}`)
  };

  const userRoles = useUserStore.getState().roles;

  return (
    <Box
      as="aside"
      width={isOpen ? '250px' : '75px'}
      position="fixed"
      top="0"
      left="0"
      h="100%"
      bg={ colorMode === "light" ? "pink.800" : 'blue.200'}
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
      <Stack mt="4" paddingInline="3">
      {userRoles.includes(RoleType.SuperAdmin) ? (
          <Button
            width="full"
            justifyContent="left"
            iconSpacing="4"
            leftIcon={<SearchIcon />}
            colorScheme={colorMode === "dark" ? 'gray' : 'whiteAlpha'}
            variant={activeNavItem === 'usuarios' ? 'solid' : 'ghost'}
            onClick={() => handleNavItemClick('usuarios')}
          >
            Usuarios
          </Button>
        ) : null}

        {userRoles.includes(RoleType.Admin) || userRoles.includes(RoleType.SuperAdmin) || userRoles.includes(RoleType.RequestApprover) ? (
          <Button
            width="full"
            justifyContent="left"
            iconSpacing="4"
            leftIcon={<SearchIcon />}
            colorScheme={colorMode === "dark" ? 'gray' : 'whiteAlpha'}
            variant={activeNavItem === 'solicitudes' ? 'solid' : 'ghost'}
            onClick={() => handleNavItemClick('solicitudes')}
          >
            Solicitudes
          </Button>
        ) : null}

        {userRoles.includes(RoleType.SuperAdmin) ? (
          <Button
            width="full"
            justifyContent="left"
            iconSpacing="4"
            leftIcon={<AddIcon />}
            colorScheme={colorMode === "dark" ? 'gray' : 'whiteAlpha'}
            variant={activeNavItem === 'roles' ? 'solid' : 'ghost'}
            onClick={() => handleNavItemClick('roles')}
          >
            Roles
          </Button>
        ) : null}

        {userRoles.includes(RoleType.SuperAdmin) || userRoles.includes(RoleType.ContentApprover)  ? (
          <Button
            width="full"
            justifyContent="left"
            iconSpacing="4"
            leftIcon={<EmailIcon />}
            colorScheme={colorMode === "dark" ? 'gray' : 'whiteAlpha'}
            variant={activeNavItem === 'email' ? 'solid' : 'ghost'}
            onClick={() => handleNavItemClick('email')}
          >
            Eventos
          </Button>
        ) : null}


        {/* Add more navigation options as needed */}
      </Stack>
    </Box>
  );
};

export default Sidebar;
