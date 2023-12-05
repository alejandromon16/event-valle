'use client'
import Form, { InputFieldType } from '@/src/components/Form';
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { useGetEventByIdQuery, useUpdateEventMutation } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react'
import { z } from 'zod';

interface PageProps {
  params: {
    id: string
  }
}

const page: FC<PageProps> = ({params}) => {

  const { data, isLoading } = useGetEventByIdQuery(graphqlRequestClient, {
    input: {
      eventId: params.id,
    },
  });

  const [formData, setFormData] = useState<z.infer<typeof schema> | undefined>(undefined);

  useEffect(() => {
    if (data) {
      const requestEvent = data.getEventById
      setFormData({
        Titulo: requestEvent.title,
        Subtitulo: requestEvent.subtitle,
        Description: requestEvent.description,
        "Fecha de Inicio": requestEvent.startDate,
        Direccion: requestEvent.address,
        Ubicacion: requestEvent.locationName,
        "Detalle de ubicacion": requestEvent.locationDetail,
        "Fecha de Finalizacion": requestEvent.endDate,
        "Imagen Principal": requestEvent.principalImage,
      });
    }
  }, [data]);

  const schema = z.object({
    Titulo: z.string().min(1, { message: 'Title must have at least 1 character' }),
    Subtitulo: z.string(),
    Description: z.string(),
    "Fecha de Inicio": z.string(),
    "Fecha de Finalizacion": z.string().optional(),
    Ubicacion: z.string(),
    "Detalle de ubicacion": z.string().optional().nullable(),
    Direccion: z.string(),
    "Imagen Principal": z.string().optional(),
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
    "Imagen Principal": { type:InputFieldType.Image },
  };

  const toast = useToast();
  const authStore = useAuthStore();
  const router = useRouter();
  const { mutate: updateEvent } = useUpdateEventMutation(
    graphqlRequestClient,
    {
      onSuccess(data) {
        router.push('/admin/eventos')
        const examplePromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(200);
          }, 2000);
        });

        toast.promise(
          examplePromise.then(() => {
            // refetch();
          }),
          {
            success: {
              title: 'El evento fue actualizado',
              description: 'El evento fue editado.',
              position: 'bottom-right',
            },
            error: { title: 'Promise rejected', description: 'Something wrong', position: 'bottom-right' },
            loading: { title: 'Actualizando Evento', description: 'Por favor espera que se actualize el evento', position: 'bottom-right' },
          }
        );
      },
    }
  );

  const handleEditEvent = async (data: z.infer<typeof schema>) => {
    console.log('editing request with data:', data);
    await updateEvent({
      input: {
        title: data.Titulo,
        subtitle: data.Subtitulo,
        eventId: params.id,
        startDate: data['Fecha de Inicio'],
        locationName: data.Ubicacion,
        description: data.Description,
        address: data.Direccion,
        endDate: data['Fecha de Finalizacion'],
        principalImage: data['Imagen Principal'],
        images: data.Imagenes,
      }
    })
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (<div>
      <Form
        onCancel={() => {router.back() } }
        onSubmit={handleEditEvent}
        schema={schema}
        fieldConfig={fieldConfig}
        title="Edicion de Evento"
        submitButtonText="Actualizar"
        formData={formData}
      />
  </div>
  )
}

export default page
