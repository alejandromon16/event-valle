'use client'
import React, { use, useState } from 'react';
import { Box, Button, Heading, HStack, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useColorMode, useToast } from '@chakra-ui/react';
import { useGetUsersQuery } from '../../../../types';
import DataTable from '@/src/components/DataTable3';
import graphqlRequestClient from '@/src/providers/graphql';
import CreateUserModal from '@/src/components/modals/user/create';
import EditUserModal from '@/src/components/modals/user/edit';

function index() {
  const [filterInput, setFilterInput] = useState('');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
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

  const handleEditUserClick = (user) => {
    console.log('user', user)
    setSelectedUserForEdit(user);
    setIsEditUserModalOpen(true);
  };

  const handleEditUser = (editedUserData) => {
    // Implement the logic to update the user data on the server or state
    console.log('Edited User Data:', editedUserData);
    setIsEditUserModalOpen(false);
  };

  const { data } = useGetUsersQuery(graphqlRequestClient,{});

  const mappedData = React.useMemo(() => {
    if (data && data.listUsers) {
      console.log(data.listUsers)
      return data.listUsers.map(user => ({
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        name: user.name,
        lastName: user.last_name,
        phone: user.phone_number,
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

  const { colorMode } = useColorMode();
  return (
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

              <EditUserModal
                initialRef={initialRef}
                isOpen={isEditUserModalOpen}
                handleEdit={handleEditUser}
                onClose={() => setIsEditUserModalOpen(false)}
                userData={selectedUserForEdit}
              />

              <CreateUserModal
                initialRef={initialRef}
                isOpen={isCreateUserModalOpen}
                handleCreate={() => handleCreateUser}
                onClose={() => setIsCreateUserModalOpen(false)}
              />

              <DataTable data={filteredData} columns={columns} onEdit={handleEditUserClick} />
              </Box>
          </HStack>
      </Box>
  );
}

export default index;
