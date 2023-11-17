import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorMode,
  Heading,
} from '@chakra-ui/react';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuthStore } from '../stores/authStore';
import axios from 'axios';

interface HeaderProps {
  onLogout: () => void;
  router: any;
}

const Header: React.FC<HeaderProps> = ({ onLogout, router }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = useAuthStore((state) => state.logout);

  const handleHeaderClick = () => {
    onOpen();
  };

  const handleLogout = async () => {
    logout();
    await axios.delete('/api/auth');
    router.replace('/');
  }

  return (
    <Box width="100%">
      <Box
        as="header"
        boxShadow="md"
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bg={colorMode === "light" ? 'white': '#1a202c'}
      >
        <Box flex="1">
          <Heading fontSize="xl">Usuarios</Heading>
        </Box>
        <Box>
          <Button onClick={toggleColorMode} variant="ghost" p={0}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              leftIcon={<Avatar size="xs" src="/avatar2.png" />}
              rightIcon={<ChevronDownIcon />}
            >
              alm1
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
