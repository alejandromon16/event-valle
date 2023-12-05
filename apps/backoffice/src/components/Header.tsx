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
import { User } from '@prisma/client';
import ViewUserModal from './modals/user/profile';
import { useLogoutMutation, useLogoutQuery } from '@/types';
import graphqlRequestClient from '../providers/graphql';

interface HeaderProps {
  onLogout: () => void;
  router: any;
}

const Header: React.FC<HeaderProps> = ({ onLogout, router }) => {
  const authState = useAuthStore();
  const { colorMode, toggleColorMode } = useColorMode();
  const [viewProfileModalOpen, setViewProfileModalOpen] = React.useState(false);
  const [currentUserData, setCurrentUserData ] = React.useState<Partial<User>>(authState.user)
  const logout = useAuthStore((state) => state.logout);
  const { mutate: logoutUser } = useLogoutMutation(
    graphqlRequestClient,
    {}
  )
  const handleProfileClick = () => {
      setViewProfileModalOpen(true);
  };

  const handleLogout = async () => {
    logout();
    logoutUser({});
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
              {authState.user.user_name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <ViewUserModal
        isOpen={viewProfileModalOpen}
        onClose={() => setViewProfileModalOpen(false)}
        userData={currentUserData}
        roles={authState.roles}
      />
    </Box>
  );
};

export default Header;
