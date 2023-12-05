'use client'
import React, { useState } from 'react';
import { Box, Heading, HStack, Input, Text, useColorMode } from '@chakra-ui/react';
import DataTable, { MenuItem } from '@/src/components/DataTable3';
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { RoleType } from '@prisma/client';
import { useGetListOfEventByRequesterIdQuery, useGetListOfEventsQuery } from '@/types';
import { useRouter } from 'next/navigation';

function index() {
  const [filterInput, setFilterInput] = useState('');
  const router = useRouter();
  const authStore = useAuthStore();
  const specialQueryRoles = new Set<RoleType>(['SUPER_ADMIN', 'REQUEST_APPROVER', 'MARKETING']);
  const { data, refetch: RefetcEvents } =  authStore.roles.some(role => specialQueryRoles.has(role))
    ? useGetListOfEventsQuery(graphqlRequestClient,{})
    : useGetListOfEventByRequesterIdQuery(graphqlRequestClient,{
      input: {
        requesterId: authStore.user.id ? authStore.user.id : ''
      }
    })

  console.log(data);

  const mappedData = React.useMemo(() => {
    if (!data) return [];

    return ('getListOfEvents' in data
      ? data.getListOfEvents
      : data.getListOfEventsByRequesterId
    ).map((item) => ({
      id: item.id,
      title: item.title,
      status: item.status,
      requester: `${item.requestEvent?.requestedBy?.name} ${item.requestEvent?.requestedBy?.last_name} `,
      createdAt: new Date(+item.createdAt).toLocaleString(),
      approver: `${item.requestEvent?.approvedBy?.name} ${item.requestEvent?.approvedBy?.last_name} `,
      startDate: new Date(item.startDate).toLocaleDateString(),
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
        Header: 'Fecha de Aceptacion',
        accessor: 'createdAt',
      },
      {
        Header: 'Solicitado por',
        accessor: 'requester'
      },
      {
        Header: 'Aprobado por',
        accessor: 'approver',
      },
      {
        Header: 'Titulo',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Fecha de Evento',
        accessor: 'startDate'
      }
    ],
    []
  );

  const handleEditClick = (data:any) => {
    console.log(data)
    router.push(`/admin/eventos/edit/${data.id}`)
  };

  const handleRevisionClick = (data:any) => {
    router.push(`/admin/eventos/revision/${data.id}`)
  }

  const handleDetailsClick = (data: any) => {
    router.push(`/admin/eventos/details/${data.id}`)
  }

  const handlePreviewClick = (data: any) => {
    router.push(`/admin/eventos/preview/${data.id}`)
  }

  const generateMenuItems = (onClick: (data: any) => void, additionalItems: MenuItem[] = []): MenuItem[] => [
    ...additionalItems,
    {
      label: 'Preview',
      onClick,
    },
  ];

  const menuItemsApprover: MenuItem[] = [
    ...generateMenuItems((data) => handlePreviewClick(data),[
      {
        label: 'Revision',
        onClick: (data) => handleRevisionClick(data),
      },
    ]),
  ];

  const menuItemsMarketingTeam: MenuItem[] = [
    ...generateMenuItems((data) => handlePreviewClick(data), [
      {
        label: 'Edit',
        onClick: (data) => handleEditClick(data),
      },
    ]),
  ];

  const menuItemsRequester: MenuItem[] = [
    ...generateMenuItems((data) => handlePreviewClick(data)),
  ];

  const getMenuItems = () => {
    switch (true) {
      case authStore.roles.some(role => role === 'REQUEST_APPROVER' || role === 'SUPER_ADMIN'):
        return menuItemsApprover;
      case authStore.roles.some(role => role === 'MARKETING'):
        return menuItemsMarketingTeam;
      default:
        return menuItemsRequester;
    }
  };
  const menuItems = getMenuItems();


  return (
      <Box margin="20">
          <Heading marginBottom="2" size="xl">Eventos</Heading>
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
                </HStack>

              <DataTable
                data={filteredData}
                columns={columns}
                menuItems={ menuItems}
              />
              </Box>
          </HStack>
      </Box>
  );
}

export default index;
