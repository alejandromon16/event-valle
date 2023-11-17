import React, { useState, useRef, ChangeEvent } from 'react';
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

// Define Zod schema for user data with custom error messages
export const userSchema = z.object({
  name: z.string().min(1, { message: 'Name must have at least 1 character' }),
  lastName: z.string().min(1, { message: 'Last Name must have at least 1 character' }),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must have at least 6 characters' }),
  phone: z.string().min(10, { message: 'Phone number must have at least 10 characters' }),
});

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreate: (userData: z.infer<typeof userSchema>) => void;
  initialRef: React.RefObject<HTMLInputElement>;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  handleCreate,
  initialRef,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

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
      handleCreate(formData);
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
        <ModalHeader>Crear Usuario</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderInputField('name', 'Name')}
          {renderInputField('lastName', 'Last Name')}
          {renderInputField('email', 'Email')}
          {renderInputField('password', 'Password', 'password')}
          {renderPhoneNumberField()}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
