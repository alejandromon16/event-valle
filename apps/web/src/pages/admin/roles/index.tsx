import DataTable from '@/components/DataTable3'
import CreateRequestEventModal from '@/components/FormsModals/CreateRequestEvent'
import CreateUserModal from '@/components/FormsModals/CreateUser'
import MyMultiSelect from '@/components/MultiSelect'
import Layout from '@/layouts/admin.layout'
import { Heading, Modal, Text, Button, HStack, Input, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, InputGroup, InputLeftAddon, ModalFooter, Box, useToast, useColorMode } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useCreateRequestEventMutation, useGetListOfRequestsEventsQuery, useRolesListQuery } from '../../../../types'


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
          requestedById: "ef52601b-0793-4799-9500-5ca425f2398e"
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

  const { data, loading, error, refetch } = useRolesListQuery();

  const mappedData = React.useMemo(() => {
    if (data && data.rolesList) {
      return data.rolesList.map(role => ({
        id: role.id,
        name: role.name,
        description: role.description,
        users: role.users.map(user => user.name).join(', '), // Join user names
      }));
    }
    return [];
  }, [data]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Users',
        accessor: 'users',
      },
    ],
    []
  );

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

  return (
    <Layout>
    <Box margin="20">
        <Heading marginBottom="2" size="xl">Roles</Heading>
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
                </HStack>
        </HStack>
        <DataTable columns={columns} data={filteredData} />
    </Box>
  </Layout>
  )
}

export default index
