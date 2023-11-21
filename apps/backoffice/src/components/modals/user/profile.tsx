import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { User } from '@prisma/client';

interface ViewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: Partial<User>;
  roles: string[];
}

const ViewUserModal: React.FC<ViewUserModalProps> = ({ isOpen, onClose, userData, roles }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius="lg">
        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">
          Perfil del usuario
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="start">
            {renderField('Name:', userData.name)}
            {renderField('Last Name:', userData.last_name)}
            {renderField('Email:', userData.email)}
            {renderField('Phone:', userData.phone_number)}
            {renderRoles('Roles:', roles)}
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="pink" variant="solid" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const renderField = (label: string, value: string | undefined | null) => {
  if (value === undefined || value === null) {
    return null;
  }

  return (
    <VStack align="start" spacing={0} key={label}>
      <Text fontWeight="bold">{label}</Text>
      <Text>{value}</Text>
    </VStack>
  );
};

const renderRoles = (label: string, roles: string[]) => {
  if (!roles.length) {
    return null;
  }

  return (
    <VStack align="start" spacing={0} key={label}>
      <Text fontWeight="bold">{label}</Text>
      {roles.map((role) => (
        <Text key={role}>{role}</Text>
      ))}
    </VStack>
  );
};

export default ViewUserModal;

