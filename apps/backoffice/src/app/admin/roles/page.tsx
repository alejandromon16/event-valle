'use client'
import React, { useState } from 'react';
import { Box, Heading, HStack, Input, Text, useColorMode } from '@chakra-ui/react';
import DataTable, { MenuItem } from '@/src/components/DataTable3';
import graphqlRequestClient from '@/src/providers/graphql';
import { useAuthStore } from '@/src/stores/authStore';
import { RoleType } from '@prisma/client';
import { useGetListOfEventByRequesterIdQuery, useGetListOfEventsQuery, useRolesListQuery } from '@/types';
import { useRouter } from 'next/navigation';

function index() {
  const [filterInput, setFilterInput] = useState('');
  const router = useRouter();
  const authStore = useAuthStore();
  const { data, refetch: RefetcEvents } = useRolesListQuery(graphqlRequestClient,{});

  const mappedData = React.useMemo(() => {
    if (!data) return [];

    return (
      data.rolesList
    ).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
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
        accessor: 'id',
      },
      {
        Header: 'Rol',
        accessor: 'name'
      },
      {
        Header: 'Descripcion',
        accessor: 'description',
      },
    ],
    []
  );

  const menuItems:MenuItem[] = [];

  return (
      <Box margin="20">
          <Heading marginBottom="2" size="xl">Roles</Heading>
          <Text>En esta pantalla podras visualizar los roles y informacion relacionadas</Text>
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
