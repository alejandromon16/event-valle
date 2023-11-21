'use client'
import React, { use, useState } from 'react';
import { Box, Button, Heading, HStack, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useGetListOfRequestsEventsByUserIdQuery, useGetListOfRequestsEventsQuery, useGetUsersQuery } from '../../../../types';
import DataTable from '@/src/components/DataTable3';
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { RoleType } from '@prisma/client';
import CreateRequestEventModal from '@/src/components/modals/requestEvent/create';
import EditRequestEventModal from '@/src/components/modals/requestEvent/edit';

function index() {
  const [filterInput, setFilterInput] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedForEdit, setSelectedForEdit] = useState(null);
  const initialRef = React.useRef(null)
  const authStore = useAuthStore();
  const specialQueryRoles = new Set<RoleType>(['SUPER_ADMIN', 'REQUEST_APPROVER']);
  const { data, refetch: RefetchRequestsEvents } =  authStore.roles.some(role => specialQueryRoles.has(role))
    ? useGetListOfRequestsEventsQuery(graphqlRequestClient,{})
    : useGetListOfRequestsEventsByUserIdQuery(graphqlRequestClient,{
      input: {
        userId: authStore.user.id ? authStore.user.id : ''
      }
    })


  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (data:any) => {
    setSelectedForEdit(data);
    setIsEditModalOpen(true);
  };

  console.log(data)
  const mappedData = React.useMemo(() => {
    if (!data) return [];

    return ('getListOfRequestsEvents' in data
      ? data.getListOfRequestsEvents
      : data.getListOfRequestsEventsByUserId
    ).map((item) => ({
      id: item.id,
      title: item.title,
      status: item.status,
      user: item.requestedBy?.user_name,
    }));
  }, [data]);

  const filteredData = React.useMemo(() => {
    if (Array.isArray(mappedData)) {
      return mappedData.filter((row) =>
        Object.values(row).some((cell) =>
          cell.toString().toLowerCase().includes(filterInput.toLowerCase())
        )
      );
    } else {
      return [];
    }
  }, [mappedData, filterInput]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id', // User's name
      },
      {
        Header: 'Solicitado por',
        accessor: 'user'
      },
      {
        Header: 'Titulo',
        accessor: 'title', // User's email
      },
      {
        Header: 'Status',
        accessor: 'status', // User's creation date
      },
    ],
    []
  );

  const { colorMode } = useColorMode();
  return (
      <Box margin="20">
          <Heading marginBottom="2" size="xl">Solicitudes de Eventos</Heading>
          <Text>En esta pantalla podras visualizar los roles y informacion relacionadas. Tambien la creacion y edicion de usuarios.</Text>
          <HStack justifyContent="space-between" marginY="10">
              <Box width="full">
                <HStack width="full" justifyContent="space-between">
                  <Input
                      type="text"
                      value={filterInput}
                      onChange={(e) => setFilterInput(e.target.value)}
                      placeholder="Search..."
                      width="160"
                    />
                  <Button onClick={handleCreateClick} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="solid">
                    Crear Solicitud
                  </Button>
                </HStack>

              <EditRequestEventModal
                initialRef={initialRef}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                data={selectedForEdit}
                refetch={RefetchRequestsEvents}
              />

              <CreateRequestEventModal
                initialRef={initialRef}
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                refetch={RefetchRequestsEvents}
              />

              <DataTable data={filteredData} columns={columns} onEdit={handleEditClick} />
              </Box>
          </HStack>
      </Box>
  );
}

export default index;
