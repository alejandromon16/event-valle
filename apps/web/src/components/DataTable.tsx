import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {
  ChakraProvider,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Checkbox,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, // Import Checkbox from Chakra UI
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

function DataTable({ columns, data }) {
  const [menuOpen, setMenuOpen] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, pageOptions, pageCount },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handleEditClick = (rowIndex) => {
    // Handle edit button click here
  };

  const handleDeleteClick = (rowIndex) => {
    // Handle delete button click here
  };

  const toggleRowSelection = (rowIndex) => {
    // Toggle the selected state of the row
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  return (
    <Box>
      <Table {...getTableProps()} border="gray" boxShadow="md" variant="simple" colorScheme="gray">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              <Th>
                <Checkbox
                  isChecked={
                    selectedRows.length === data.length
                  }
                  onChange={() => {
                    if (selectedRows.length === data.length) {
                      setSelectedRows([]);
                    } else {
                      setSelectedRows(data.map((_, index) => index));
                    }
                  }}
                />
              </Th>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
              <Th>Actions</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            const isRowSelected = selectedRows.includes(rowIndex);
            const rowClassName = isRowSelected ? 'selected' : '';

            return (
              <Tr
                bgColor={isRowSelected ? 'gray.100': ''}
                {...row.getRowProps()}
                className={rowClassName}
              >
                <Td>
                  <Checkbox
                    isChecked={isRowSelected}
                    onChange={() => toggleRowSelection(rowIndex)}
                  />
                </Td>
                {row.cells.map((cell) => (
                  <Td

                  {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
                <Td>
                  <HStack spacing={2}>
                    <Menu placement='bottom-end'>
                      <MenuButton as={Button}
                      variant="ghost"
                      >...</MenuButton>
                      <MenuList>
                        <MenuItem onClick={()=>{}}>
                          Editar
                        </MenuItem>
                        <MenuItem onClick={()=> {}}>
                          Detalles
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <HStack mt="4" justifyContent="space-between">
        <Text>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>
        </Text>
        <Box>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage} variant="outline">
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage} variant="outline">
            Next
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}

export default DataTable;
