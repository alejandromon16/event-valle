"use client"
import Form, { InputFieldType } from '@/src/components/Form';
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { useCreateRequestEventMutation } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import { date, z } from 'zod';


function page() {

  const schema = z.object({
    Titulo: z.string().min(1, { message: 'Title must have at least 1 character' }),
    Subtitulo: z.string(),
    Description: z.string(),
    "Fecha de Inicio": z.string(),
    "Fecha de Finalizacion": z.date().optional(),
    Ubicacion: z.string(),
    "Detalle de ubicacion": z.string().optional(),
    Direccion: z.string(),
  });

  const fieldConfig = {
    Titulo: { type: InputFieldType.Text },
    Subtitulo: { type: InputFieldType.Text },
    Description: { type: InputFieldType.TextArea },
    "Fecha de Inicio": { type: InputFieldType.Date },
    "Fecha de Finalizacion": { type: InputFieldType.Date},
    Ubicacion: { type: InputFieldType.Text },
    "Detalle de Ubicacion": { type: InputFieldType.Text },
    Direccion: { type: InputFieldType.Text },
  };

  const toast = useToast();
  const authStore = useAuthStore();
  const router = useRouter();
  const { mutate: createRequestEvent } = useCreateRequestEventMutation(
    graphqlRequestClient,
    {
      onSuccess(data) {
        router.push('/admin/solicitudes');
        const examplePromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(200);
          }, 2000);
        });

        toast.promise(
          examplePromise.then(() => {
          }),
          {
            success: {
              title: 'Solicitud Enviada',
              description: 'Tu solicitud sera revisada y se notificara su aceptacion.',
              position: 'bottom-right',
            },
            error: { title: 'Promise rejected', description: 'Something wrong', position: 'bottom-right' },
            loading: { title: 'Enviando solicitud', description: 'Por favor espera que se envie tu solicitud.', position: 'bottom-right' },
          }
        );
      },
    }
  );

  const handleCreateRequestEvent = (data: z.infer<typeof schema>) => {
    console.log('creating request with data:', data);
    createRequestEvent({
      input: {
        requestedById: authStore.user.id ? authStore.user.id : '',
        title: data.Titulo,
        subtitle: data.Subtitulo,
        description: data.Description,
        startDate: data['Fecha de Inicio'],
        endDate: data['Fecha de Finalizacion'] ? data['Fecha de Finalizacion'].toISOString(): null,
        locationName: data.Ubicacion,
        address: data.Direccion,

      },
    });
  };


  return (
      <Form
        onCancel={() => { router.back() } }
        onSubmit={handleCreateRequestEvent}
        schema={schema}
        fieldConfig={fieldConfig}
        title="Creacion de Solicitud"
        submitButtonText="Crear"
      />
  )
}

export default page
