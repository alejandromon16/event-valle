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
  Button,
  Text,
} from '@chakra-ui/react';
import { z, ZodError } from 'zod';

interface FormModalProps<T extends z.ZodObject<any, any, any>> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: z.infer<T>) => void;
  initialRef: React.RefObject<HTMLInputElement>;
  schema: T;
  title: string;
  submitButtonText: string;
  formData?: z.infer<T> | undefined;
}

const FormModal = <T extends z.ZodObject<any, any, any>>({
  isOpen,
  onClose,
  onSubmit,
  initialRef,
  schema,
  title,
  submitButtonText,
  formData,
}: FormModalProps<T>) => {
  const [formState, setFormState] = useState(formData || {} as z.infer<T>);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    setFormState(formData || {} as z.infer<T>);
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevData) => ({ ...prevData, [name]: value }));
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
      schema.parse(formState);
      clearErrors();
      onSubmit(formState);
      onClose();
    } catch (error) {
      if (error instanceof ZodError) {
        handleValidationErrors(error);
      }
    }
  };

  const renderInputField = (field: z.ZodTypeAny, key: string) => {
    const label:string = schema.shape.labels?.[key] || key;

    return (
      <FormControl mt={4} isInvalid={!!errors[key]} key={key}>
        <FormLabel textTransform={"capitalize"} >{label}</FormLabel>
        <Input name={key} type="text" value={formState[key]} onChange={handleChange} />
        <Text color="red.500">{errors[key]}</Text>
      </FormControl>
    );
  };


  const renderFormFields = () => {
    const shape = schema.shape as Record<string, z.ZodTypeAny>;

    return Object.entries(shape).map(([key, field]) => {
      return renderInputField(field, key);
    });
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderFormFields()}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="pink" onClick={handleSubmit}>
            {submitButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
