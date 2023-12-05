'use client'
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { useApproveRequestEventMutation, useGetRequestEventByIdQuery, useRejectRequestEventMutation } from '@/types';
import { Box, Button, Divider, SimpleGrid, Text, useColorMode, useToast } from '@chakra-ui/react';
import { RequestEventStatus } from '@prisma/client';
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
  status: RequestEventStatus;
  onApproveRequest: () => void;
  onRejectRequest: () => void;
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
  onApproveRequest,
  onRejectRequest,
}) => {

  const { colorMode } = useColorMode();
  return (
    <Box
      boxShadow="md"
      p={4} borderRadius="md"
      bg={colorMode === "light" ? 'white': '#1a202c'}
      mb={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingX={20}
      paddingY={10}
      borderWidth={1}
      borderColor={colorMode === "light" ? 'white': '#f1f1f11c'}
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
        {status === 'PENDING' && (
          <Box display="flex" justifyContent="space-around">
            <Button onClick={() => {onRejectRequest()}} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="outline">
              Rechazar
            </Button>
            <Divider width={1} />
            <Button onClick={() => {onApproveRequest()}} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="solid">
              Aprobar
            </Button>
          </Box>
        )}

        {status === 'APPROVED' && (
          <Box
            backgroundColor="green.200"
            backgroundBlendMode={"color-dodge"}
            borderRadius="md"
            paddingX={5}
            paddingY={2}
          >
            <Text
             color="blackAlpha.600"
            >Solicitud Aprobada</Text>
          </Box>
        )}

        {status === 'REJECTED' && (
          <Box
            backgroundColor="red.200"
            backgroundBlendMode={"color-dodge"}
            borderRadius="md"
            paddingX={5}
            paddingY={2}
          >
            <Text>Solicitud Rechazada</Text>
          </Box>
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

  const { mutate: approveRequest } = useApproveRequestEventMutation(
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
              title: 'La Solicitud fue aceptada',
              description: 'Se notificara al solicitante la aprobacion, El evento ha sido creado.',
              position: 'bottom-right',
            },
            error: { title: 'Promise rejected', description: 'Something wrong', position: 'bottom-right' },
            loading: { title: 'Aprobando solicitud', description: 'Por favor espera que se aprobe la solicitud', position: 'bottom-right' },
          }
        );
      },

    }
  )

  const { mutate: rejectRequest } = useRejectRequestEventMutation(
    graphqlRequestClient,
    {
      onSuccess(data) {
        router.push('/admin/solicitudes')
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
              title: 'Rechazaste la solicitud',
              description: 'Se notificara al solicitante el rechazo de la solicitud.',
              position: 'bottom-right',
            },
            error: { title: 'Promise rejected', description: 'Something wrong', position: 'bottom-right' },
            loading: { title: 'Rechazando solicitud', description: 'Por favor espera que se rechaze la solicitud', position: 'bottom-right' },
          }
        );
      },
    }
  )

  const onApproveRequestEventClick = () => {
    approveRequest({
      input: {
        requestEventId: params.id,
        approverId: authStore.user.id ? authStore.user.id : '',
      }
    })
  }

  const onRejectRequestEventClick = () => {
    rejectRequest({
      input: {
        requestEventId: params.id,
        approverId: authStore.user.id ? authStore.user.id : '',
      }
    })
  }

  const { data, isLoading } = useGetRequestEventByIdQuery(graphqlRequestClient, {
    input: {
      requestEventId: params.id,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || !data.getRequestEventById) {
    return <div>Event not found</div>;
  }

  const requestEvent = data.getRequestEventById;

  return (
    <Box>
      <EventCard
        title={requestEvent.title}
        subtitle={requestEvent.subtitle}
        description={requestEvent.description}
        startDate={requestEvent.startDate}
        endDate={requestEvent.endDate}
        address={requestEvent.address}
        locationName={requestEvent.locationName}
        status={requestEvent.status}
        onApproveRequest={onApproveRequestEventClick}
        onRejectRequest={onRejectRequestEventClick}
      />
      <Button onClick={() => router.back()}>Go Back</Button>
    </Box>
  );
};

export default EventPage;
