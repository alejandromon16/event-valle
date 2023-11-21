import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { useCreateRequestEventMutation } from '@/types';
import { useToast } from '@chakra-ui/react';
import React from 'react';
import { z } from 'zod';
import FormModal from '../FormModal';

export const createRequestEventSchema = z.object({
  titulo: z.string().min(1, { message: 'Title must have at least 1 character' }),
});

interface CreateRequestEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRef: React.RefObject<HTMLInputElement>;
  refetch: () => void
}

const CreateRequestEventModal: React.FC<CreateRequestEventModalProps> = ({
  isOpen,
  onClose,
  initialRef,
  refetch,
}) => {

  const toast = useToast();
  const authStore = useAuthStore();
  const { mutate: createRequestEvent } = useCreateRequestEventMutation(
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
          loading: { title: 'Enviando solicitud', description: 'Por favor espera que se envie tu solicitud.', position:'bottom-right' },
        });
      }
    }
  )

  const handleCreateRequestEvent = (data: z.infer<typeof createRequestEventSchema>) => {

    console.log('creating request with data:', data);
    createRequestEvent({
      input: {
        requestedById: authStore.user.id ? authStore.user.id : '',
        title: data.titulo,
      }
    })
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCreateRequestEvent}
      initialRef={initialRef}
      schema={createRequestEventSchema}
      title="Crear Solicitud de Evento"
      submitButtonText="Crear"
    />
  );
};

export default CreateRequestEventModal;
