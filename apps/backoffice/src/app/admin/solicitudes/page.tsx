'use client'
import React, { useState } from 'react';
import { Box, Button, Heading, HStack, Input, Text, useColorMode } from '@chakra-ui/react';
import { useGetListOfRequestsEventsByUserIdQuery, useGetListOfRequestsEventsQuery } from '../../../../types';
import DataTable, { MenuItem } from '@/src/components/DataTable3';
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { RoleType } from '@prisma/client';
import { useRouter } from 'next/navigation';

function index() {
  const [filterInput, setFilterInput] = useState('');
  const authStore = useAuthStore();
  const router = useRouter()
  const specialQueryRoles = new Set<RoleType>(['SUPER_ADMIN', 'REQUEST_APPROVER']);
  const { data, refetch: RefetchRequestsEvents } =  authStore.roles.some(role => specialQueryRoles.has(role))
    ? useGetListOfRequestsEventsQuery(graphqlRequestClient,{})
    : useGetListOfRequestsEventsByUserIdQuery(graphqlRequestClient,{
      input: {
        userId: authStore.user.id ? authStore.user.id : ''
      }
    })


  const handleCreateClick = () => {
    router.push('/admin/solicitudes/create')
  };

  const handleEditClick = (data:any) => {
    console.log(data)
    router.push(`/admin/solicitudes/edit/${data.id}`)
  };

  const handleRevisionClick = (data:any) => {
    router.push(`/admin/solicitudes/revision/${data.id}`)
  }

  const handleDetailsClick = (data: any) => {
    router.push(`/admin/solicitudes/details/${data.id}`)
  }

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
      createdAt: item.createdAt ? new Date(+item.createdAt).toLocaleString(): null,
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
        Header: 'Creado',
        accessor: 'createdAt',
      },
      {
        Header: 'Solicitado por',
        accessor: 'user'
      },
      {
        Header: 'Titulo',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  );

  const generateMenuItems = (onClick: (data: any) => void, additionalItems: MenuItem[] = []): MenuItem[] => [
    ...additionalItems,
    {
      label: 'Detalles',
      onClick,
    },
  ];

  const menuItemsApprover: MenuItem[] = [
    ...generateMenuItems((data) => handleDetailsClick(data),[
      {
        label: 'Revision',
        onClick: (data) => handleRevisionClick(data),
      }
    ])
  ]

  const menuItemsRequester: MenuItem[] = [
    ...generateMenuItems((data) => handleDetailsClick(data),[
      {
        label: 'Edit',
        onClick: (data) => handleEditClick(data),
      },
    ])
  ];

  const getMenuItems = () => {
    switch (true) {
      case authStore.roles.some(role => role === 'REQUEST_APPROVER' || role === 'SUPER_ADMIN'):
        return menuItemsApprover;
      default:
        return menuItemsRequester;
    }
  };
  const menuItems = getMenuItems();

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
                  {!authStore.roles.some(role => role === 'REQUEST_APPROVER') && (
                    <Button onClick={handleCreateClick} colorScheme={colorMode === 'light' ? 'pink': 'blue'} variant="solid">
                      Crear Solicitud
                    </Button>
                  )}

                </HStack>

              <DataTable
                data={filteredData}
                columns={columns}
                menuItems={menuItems}
              />
              </Box>
          </HStack>
      </Box>
  );
}

export default index;
