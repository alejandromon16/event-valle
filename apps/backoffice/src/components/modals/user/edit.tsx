// EditUserForm.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  Text,
} from '@chakra-ui/react';
import { z, ZodError } from 'zod';
import { userSchema } from './create';

interface EditUserFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: z.infer<typeof userSchema>) => void;
  initialRef: React.RefObject<HTMLInputElement>;
  userData: z.infer<typeof userSchema>;
}

const EditUserModal: React.FC<EditUserFormProps> = ({ isOpen, onClose, onSubmit, initialRef, userData }) => {
  console.log('this is user edit data', userData)
  const [formData, setFormData] = useState({ ...userData });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearErrors = () => setErrors({});

  const handleValidationErrors = (error: ZodError) => {
    const newErrors: Record<string, string> = {};
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      newErrors[path] = err.message;
    });
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    try {
      userSchema.parse(formData);
      clearErrors();
      onSubmit(formData);
      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        handleValidationErrors(error);
      }
    }
  };

  const renderInputField = (name: string, label: string, type: string = 'text') => (
    <FormControl mt={4} isInvalid={!!errors[name]} key={name}>
      <FormLabel>{label}</FormLabel>
      <Input name={name} type={type} value={formData[name]} onChange={handleChange} />
      <Text color="red.500">{errors[name]}</Text>
    </FormControl>
  );

  const renderPhoneNumberField = () => (
    <FormControl mt={4} isInvalid={!!errors.phone} key="phone">
      <FormLabel>Celular</FormLabel>
      <InputGroup>
        <InputLeftAddon children="+591" />
        <Input
          name="phone"
          type="tel"
          placeholder="phone number"
          value={formData.phone}
          onChange={handleChange}
        />
      </InputGroup>
      <Text color="red.500">{errors.phone}</Text>
    </FormControl>
  );

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderInputField('name', 'Name')}
          {renderInputField('lastName', 'Last Name')}
          {renderInputField('email', 'Email')}
          {renderPhoneNumberField()}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
