import React, { useRef } from 'react';
import { z } from 'zod';
import FormModal from '../FormModal';

export const userSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userData: z.infer<typeof userSchema>) => void;
  initialRef: React.RefObject<HTMLInputElement>;
  userData: z.infer<typeof userSchema>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  userData,
  initialRef,
}) => {

  const handleEditUser = (data: z.infer<typeof userSchema>) => {
    // Your logic for handling user edit
    console.log('Editing user with data:', data);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditUser}
      initialRef={initialRef}
      formData={userData}
      schema={userSchema}
      title="Editar Usuario"
      submitButtonText="Guardar"
    />
  );
};

export default EditUserModal;
