import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { useCreateUserMutation } from '@/types';
import { useToast } from '@chakra-ui/react';
import React from 'react';
import { z } from 'zod';
import FormModal from '../FormModal';

export const userSchema = z.object({
  name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  user_name: z.string(),
  phone: z.string(),
  password: z.string().min(4),
});

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  refetch: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  initialRef,
  refetch,
}) => {
  const toast = useToast();
  const authStore = useAuthStore();
  const { mutate: createUser } = useCreateUserMutation(
    graphqlRequestClient,
    {
      onSuccess(data) {
        const examplePromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(200);
          }, 2000);
        });

        toast.promise(examplePromise.then(() => {
          refetch();
        }), {
          success: { title: 'Solicitud Enviada', description: 'Tu solicitud sera revisada y se notificara su aceptacion.', position:'bottom-right' },
          error: { title: 'Promise rejected', description: 'Something wrong', position:'bottom-right' },
          loading: { title: 'Creando Usuario', description: 'Por favor espera que se envie tu solicitud.', position:'bottom-right' },
        });
      },
    }
  )
  const handleCreateUser = (data: z.infer<typeof userSchema>) => {

    console.log('creating user with data:', data);
    createUser({
      input: data
    })
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCreateUser}
      initialRef={initialRef}
      schema={userSchema}
      title="Editar Usuario"
      submitButtonText="Guardar"
    />
  );
};

export default CreateUserModal;
