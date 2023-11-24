'use client'
import Form, { InputFieldType } from '@/src/components/Form';
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { useGetRequestEventByIdQuery } from '@/types';
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

  const { data, isLoading } = useGetRequestEventByIdQuery(graphqlRequestClient, {
    input: {
      requestEventId: params.id,
    },
  });

  const [formData, setFormData] = useState<z.infer<typeof schema> | undefined>(undefined);

  useEffect(() => {
    if (data) {
      const requestEvent = data.getRequestEventById
      setFormData({
        Titulo: requestEvent.title,
        Subtitulo: requestEvent.subtitle,
        Description: requestEvent.description,
        "Fecha de Inicio": requestEvent.startDate,
        Direccion: requestEvent.address,
        Ubicacion: requestEvent.locationName,
        "Detalle de ubicacion": requestEvent.locationDetail,
        "Fecha de Finalizacion": requestEvent.endDate,
      });
    }
  }, [data]);

  const schema = z.object({
    Titulo: z.string().min(1, { message: 'Title must have at least 1 character' }),
    Subtitulo: z.string(),
    Description: z.string(),
    "Fecha de Inicio": z.string(),
    "Fecha de Finalizacion": z.date().optional(),
    Ubicacion: z.string(),
    "Detalle de ubicacion": z.string().optional().nullable(),
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

  const handleEditRequestEvent = (data: z.infer<typeof schema>) => {
    console.log('editing request with data:', data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <Form
        onCancel={() => {router.back() } }
        onSubmit={handleEditRequestEvent}
        schema={schema}
        fieldConfig={fieldConfig}
        title="Edicion de Solicitud"
        submitButtonText="Crear"
        formData={formData}
      />
  )
}

export default page
