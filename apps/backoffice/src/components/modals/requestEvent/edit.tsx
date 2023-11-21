import React, { useRef } from 'react';
import { z } from 'zod';
import FormModal from '../FormModal';

export const editRequestEventSchema = z.object({
  title: z.string().min(1, { message: 'Title must have at least 1 character' }),
});

interface EditRequestEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  data: z.infer<typeof editRequestEventSchema> | null ;
  refetch: () => void;
}

const EditUserModal: React.FC<EditRequestEventModalProps> = ({
  isOpen,
  onClose,
  data,
  initialRef,
}) => {

  const handleEditUser = (data: z.infer<typeof editRequestEventSchema>) => {
    // Your logic for handling user edit
    console.log('Editing request with data:', data);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditUser}
      initialRef={initialRef}
      formData={data}
      schema={editRequestEventSchema}
      title="Editar Usuario"
      submitButtonText="Guardarrr"
    />
  );
};

export default EditUserModal;
