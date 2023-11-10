import DataTable from '@/components/DataTable3'
import CreateRequestEventModal from '@/components/FormsModals/CreateRequestEvent'
import CreateUserModal from '@/components/FormsModals/CreateUser'
import MyMultiSelect from '@/components/MultiSelect'
import Layout from '@/layouts/admin.layout'
import { useUserStore } from '@/stores/userStore'
import { Heading, Modal, Text, Button, HStack, Input, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, InputGroup, InputLeftAddon, ModalFooter, Box, useToast, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCreateRequestEventMutation, useGetListOfRequestsEventsQuery } from '../../../../types'


function index() {
  const [filterInput, setFilterInput] = useState('');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [ mutationCreateRequestEvent , { dataCreateRequest, loadingCreateRequest , errorCreateRequest }] = useCreateRequestEventMutation();

  const handleCreateRequestEventClick = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleCreateRequestEvent = (title:string) => {

    mutationCreateRequestEvent({
      variables: {
        input: {
          title,
          requestedById: useUserStore.getState().id
        }
      }
    })

    setIsCreateUserModalOpen(false);
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(200), 5000)
    })

    refetch()

    toast.promise(examplePromise, {
      success: { title: 'Promise resolved', description: 'Looks great', position:'bottom-right' },
      error: { title: 'Promise rejected', description: 'Something wrong', position:'bottom-right' },
      loading: { title: 'Promise pending', description: 'Please wait',position:'bottom-right' },
    })
  };

  const { data, loading, error, refetch } = useGetListOfRequestsEventsQuery();

  const mappedData = React.useMemo(() => {
    if (data && data.getListOfRequestsEvents) {
      return data.getListOfRequestsEvents.map(requestEvent => ({
        id: requestEvent.id,
        status: requestEvent.status,
        requestedBy: requestEvent.requestedBy,
        title: requestEvent.title
      }));
    }
    return [];
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
        Header: 'ID',
        accessor: 'id', // Request event ID
      },
      {
        Header: 'Titulo',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'status', // Request event status
      },
      {
        Header: 'Requested By',
        accessor: 'requestedBy.name', // Requested by user's name
      },
    ],
    []
  );


  return (
    <Layout>
    <Box margin="20">
        <Heading marginBottom="2" size="xl">Solicitudes de Eventos</Heading>
        <Text>En esta pantalla podras visualizar tus solicitudes y informacion relacionadas. Tambien la creacion y edicion de solicitudes.</Text>
        <HStack justifyContent="space-between" marginY="10">
            <HStack width="full" justifyContent="space-between">
                  <Input
                      type="text"
                      value={filterInput}
                      onChange={(e) => setFilterInput(e.target.value)}
                      placeholder="Search..."
                      width="160"
                    />
                  <Button onClick={handleCreateRequestEventClick} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="solid">
                    Crear Solicitud
                  </Button>
                </HStack>
                <CreateRequestEventModal
                  initialRef={initialRef}
                  isOpen={isCreateUserModalOpen}
                  onClose={() => setIsCreateUserModalOpen(false)}
                  handleCreate={handleCreateRequestEvent} />
        </HStack>
        <DataTable columns={columns} data={filteredData} />
    </Box>
  </Layout>
  )
}

export default index
