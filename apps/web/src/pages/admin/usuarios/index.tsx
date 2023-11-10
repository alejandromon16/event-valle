import React, { useState } from 'react';
import Layout from '@/layouts/admin.layout';
import { Box, Button, Checkbox, FormControl, FormLabel, Heading, HStack, IconButton, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode, useToast } from '@chakra-ui/react';
import MyMultiSelect from '@/components/MultiSelect';
import { FaPen } from 'react-icons/fa';
import DataTable from '@/components/DataTable3';
import { useGetUsersQuery } from '../../../../types';

function index() {
  const [filterInput, setFilterInput] = useState('');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast();

  const handleCreateUserClick = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleCreateUser = () => {
    setIsCreateUserModalOpen(false);
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(200), 5000)
    })
    toast.promise(examplePromise, {
      success: { title: 'Promise resolved', description: 'Looks great', position:'bottom-right' },
      error: { title: 'Promise rejected', description: 'Something wrong', position:'bottom-right' },
      loading: { title: 'Promise pending', description: 'Please wait',position:'bottom-right' },
    })
  };

  const { data, loading, error } = useGetUsersQuery();

  const mappedData = React.useMemo(() => {
    if (data && data.listUsers) {
      console.log(data.listUsers)
      return data.listUsers.map(user => ({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        name: user.name,
        roles: user.roles,
        password: user.password,
        updatedAt: user.updatedAt,
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
        Header: 'Name',
        accessor: 'name', // User's name
      },
      {
        Header: 'Email',
        accessor: 'email', // User's email
      },
      {
        Header: 'Created At',
        accessor: 'createdAt', // User's creation date
      },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({ row }) => {
          // Assuming roles is an array of role objects with 'name' property
          const roles = row.original.roles.map(role => role.name).join(', ');
          return roles;
        },
      }
    ],
    []
  );

  // Render your DataTable component with the filteredData and columns


  const { colorMode } = useColorMode();
  return (
    <Layout>
      <Box margin="20">
          <Heading marginBottom="2" size="xl">Usuarios</Heading>
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
                  <Button onClick={handleCreateUserClick} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="solid">
                    Create User
                  </Button>
                </HStack>

              <Modal initialFocusRef={initialRef} isOpen={isCreateUserModalOpen} onClose={() => setIsCreateUserModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Crear Usuario</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        ref={initialRef}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Email</FormLabel>
                      <Input
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Password</FormLabel>
                      <Input
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Celular</FormLabel>
                      <InputGroup>
                        <InputLeftAddon children='+591' />
                        <Input type='tel' placeholder='phone number' />
                      </InputGroup>
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Roles</FormLabel>
                      <MyMultiSelect />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="ghost" onClick={() => setIsCreateUserModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleCreateUser}>
                      Create
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
                <DataTable data={filteredData} columns={columns} />
              </Box>
          </HStack>
      </Box>
    </Layout>
  );
}

export default index;
