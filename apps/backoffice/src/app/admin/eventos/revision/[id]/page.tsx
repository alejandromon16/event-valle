'use client'
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { useGetEventByIdQuery, usePublishEventMutation, useUnPublishEventMutation } from '@/types';
import { Box, Button, SimpleGrid, Text, useColorMode, useToast } from '@chakra-ui/react';
import { EventStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface EventCardProps {
  title: string;
  subtitle: string;
  description: string;
  startDate: string;
  endDate?: string;
  address: string;
  locationName: string;
  locationDetail?: string;
  status: EventStatus;
  approvedBy: string;
  onUnpublish: () => void;
  onPublish: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  subtitle,
  description,
  startDate,
  endDate,
  address,
  locationName,
  locationDetail,
  status,
  approvedBy,
  onPublish,
  onUnpublish,
}) => {

  const { colorMode } = useColorMode();
  return (
    <Box
      boxShadow="md"
      p={4} borderRadius="md"
      bg="white" mb={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <SimpleGrid spacingY={2}>
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {title}
          </Text>
          <Text fontSize="md" mb={2}>
            {subtitle}
          </Text>
          <Text fontSize="sm" mb={2}>
            {description}
          </Text>
          <Text>
            <strong>Start Date:</strong> {new Date(startDate).toLocaleString()}
          </Text>
          {endDate && (
            <Text>
              <strong>End Date:</strong> {new Date(endDate).toLocaleString()}
            </Text>
          )}
          <Text>
            <strong>Address:</strong> {address}
          </Text>
          <Text>
            <strong>Location:</strong> {locationName}
          </Text>
          {locationDetail && (
            <Text>
              <strong>Location Detail:</strong> {locationDetail}
            </Text>
          )}
        </SimpleGrid>
      </Box>
      <Box>
        {status === 'DRAFT' && (
          <Button onClick={() => {onPublish()}} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="solid">
            Publicar
          </Button>
        )}

        {status === 'PUBLISH' && (
          <Button onClick={() => {onUnpublish()}} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="solid">
            Cancelar publicacion
          </Button>
        )}
      </Box>
    </Box>
  );
};

interface PageProps {
  params : {
    id: string;
  }
}

const EventPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const toast = useToast();
  const { data, isLoading } = useGetEventByIdQuery(graphqlRequestClient, {
    input: {
      eventId: params.id,
    },
  });

  const { mutate: unPublishEvent } = useUnPublishEventMutation(
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
                title: 'El evento fue Cancelada lo publicacion',
                description: 'El evento ha sido guardado con el estado de Draft. no se mostrar en la app.',
                position: 'bottom-right',
              },
              error: { title: 'Promise rejected', description: 'Something wrong', position: 'bottom-right' },
              loading: { title: 'Cancelando Evento', description: 'Por favor espera que se quite el evento', position: 'bottom-right' },
            }
          );
        },
    }
  )

  const { mutate: publishEvent } = usePublishEventMutation(
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
                title: 'El evento fue Publicado',
                description: 'El evento fue publicado, todos podran visualizar en EventValle app',
                position: 'bottom-right',
              },
              error: { title: 'Promise rejected', description: 'Something wrong', position: 'bottom-right' },
              loading: { title: 'Publicando Evento', description: 'Por favor espera que se publique el evento', position: 'bottom-right' },
            }
          );
        },
    }
  )


  const publishEventClick = () => {
    publishEvent({
      input: {
        eventId: params.id,
        userId: authStore.user.id ? authStore.user.id : " ",
      }
    })
  }

  const unPublishEventClick = () => {
    unPublishEvent({
      input: {
        eventId: params.id,
        userId: authStore.user.id ? authStore.user.id : " ",
      }
    })
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.getEventById) {
    return <div>Event not found</div>;
  }

  const event = data.getEventById;

  return (
    <Box>
      <EventCard
        title={event.title}
        subtitle={event.subtitle}
        description={event.description}
        startDate={event.startDate}
        endDate={event.endDate}
        address={event.address}
        locationName={event.locationName}
        status={event.status}
        approvedBy={`${event.requestEvent?.approvedBy?.name} ${event.requestEvent?.approvedBy?.last_name} `}
        onPublish={publishEventClick}
        onUnpublish={unPublishEventClick}
      />
      <Button onClick={() => router.back()}>Go Back</Button>
    </Box>
  );
};

export default EventPage;

