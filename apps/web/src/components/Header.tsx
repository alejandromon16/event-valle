import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  useDisclosure,
  useColorMode,
  Image,
  Heading,
} from '@chakra-ui/react';
import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleHeaderClick = () => {
    onOpen(); // Open the Menu when the header is clicked
  };

  return (
    <Box
      zIndex="20"
      position="fixed"
      top="0"
      width="88vw"  // Corrected '100wh' to '100vw' for viewport width
      as="header"
      bg="whiteAlpha.400"
      boxShadow="md"
      p={3}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading marginX={4} fontSize="xl">Usuarios</Heading>
      <Box>
        <Button onClick={toggleColorMode} variant="ghost" p={0}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton as={Button}
          variant="ghost"
          leftIcon={<Avatar size="xs" src='/avatar2.png' />}
          rightIcon={<ChevronDownIcon />}
          >alm1</MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>
              Profile
            </MenuItem>
            <MenuItem onClick={onLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
