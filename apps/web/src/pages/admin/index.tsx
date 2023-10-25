import React, { useState } from 'react';
import Layout from '@/layouts/admin.layout';
import DataTable from '@/components/DataTable';
import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text } from '@chakra-ui/react';
import MyMultiSelect from '@/components/MultiSelect';

function index() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // User's name
      },
      {
        Header: 'Last Name',
        accessor: 'last_name', // User's last name
      },
      {
        Header: 'Phone Number',
        accessor: 'phone_number', // User's phone number
      },
      {
        Header: 'User Name',
        accessor: 'user_name', // User's username
      },
      {
        Header: 'Email',
        accessor: 'email', // User's email
      },
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        name: 'John',
        last_name: 'Doe',
        phone_number: '123-456-7890',
        user_name: 'johndoe',
        email: 'john.doe@example.com',
      },
      {
        name: 'Jane',
        last_name: 'Smith',
        phone_number: '987-654-3210',
        user_name: 'janesmith',
        email: 'jane.smith@example.com',
      },
      {
        name: 'Alice',
        last_name: 'Johnson',
        phone_number: '555-555-5555',
        user_name: 'alicej',
        email: 'alice.j@example.com',
      },
      {
        name: 'Bob',
        last_name: 'Johnson',
        phone_number: '777-777-7777',
        user_name: 'bobj',
        email: 'bob.j@example.com',
      },
      {
        name: 'Emily',
        last_name: 'Wilson',
        phone_number: '333-333-3333',
        user_name: 'emilyw',
        email: 'emily.w@example.com',
      },
      {
        name: 'Michael',
        last_name: 'Brown',
        phone_number: '111-111-1111',
        user_name: 'michaelb',
        email: 'michael.b@example.com',
      },
      {
        name: 'Sarah',
        last_name: 'Lee',
        phone_number: '222-222-2222',
        user_name: 'sarahlee',
        email: 'sarah.lee@example.com',
      },
      {
        name: 'David',
        last_name: 'Miller',
        phone_number: '888-888-8888',
        user_name: 'davidm',
        email: 'david.m@example.com',
      },
      {
        name: 'Linda',
        last_name: 'Anderson',
        phone_number: '666-666-6666',
        user_name: 'lindaanderson',
        email: 'linda.anderson@example.com',
      },
      {
        name: 'William',
        last_name: 'White',
        phone_number: '444-444-4444',
        user_name: 'williamw',
        email: 'william.w@example.com',
      },
    ],
    []
  );

  const [filterInput, setFilterInput] = useState('');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const filteredData = React.useMemo(() => {
    return data.filter((row) =>
      Object.values(row).some((cell) =>
        cell.toString().toLowerCase().includes(filterInput.toLowerCase())
      )
    );
  }, [data, filterInput]);

  const handleCreateUserClick = () => {
    setIsCreateUserModalOpen(true);
  };

  const handleCreateUser = () => {
    setIsCreateUserModalOpen(false);
  };

  return (
    <Layout>
      <Box margin="20">
          <Heading marginBottom="2" size="xl">Usuarios</Heading>
          <Text>En esta pantalla podras visualizar los roles y informacion relacionadas. Tambien la creacion y edicion de usuarios.</Text>
          <HStack justifyContent="space-between" marginY="10">
            <Input
                type="text"
                value={filterInput}
                onChange={(e) => setFilterInput(e.target.value)}
                placeholder="Search..."
                width="160"
              />
              <Box>
              <Button onClick={handleCreateUserClick} colorScheme="pink" variant="solid">
                Create User
              </Button>

              <Modal initialFocusRef={initialRef} isOpen={isCreateUserModalOpen} onClose={() => setIsCreateUserModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create User</ModalHeader>
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

              </Box>
          </HStack>
          <DataTable columns={columns} data={filteredData} />
      </Box>
    </Layout>
  );
}

export default index;
