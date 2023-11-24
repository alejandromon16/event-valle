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
  Button,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList, // Import Checkbox from Chakra UI
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export interface MenuItem {
  label: string;
  onClick: (item: any) => void;
}

interface DataTableProps {
  data: any[];
  columns: any[];
  menuItems: MenuItem[];
}

function DataTable({ columns, data, onEdit, menuItems= [] }: DataTableProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
    state: { pageIndex, pageCount },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handleEditClick = (row: Row) => {
    onEdit(row.original);
  };

  const handleDeleteClick = (rowIndex: number) => {
    // Handle delete button click here
  };

  const toggleRowSelection = (rowIndex: number) => {
    // Toggle the selected state of the row
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((row) => row !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  return (
    <Box key="datatable-box">
      <Table {...getTableProps()} border="gray" boxShadow="md" variant="simple" colorScheme="gray" key="datatable-table">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              <Th key="checkbox-header">
                <Checkbox
                  isChecked={selectedRows.length === data.length}
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
                <Th {...column.getHeaderProps()} key={column.id}>
                  {column.render('Header')}
                </Th>
              ))}
              <Th key="actions-header">Actions</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} key="tbody">
          {page.map((row: Row, rowIndex: number) => {
            prepareRow(row);
            const isRowSelected = selectedRows.includes(rowIndex);
            const rowClassName = isRowSelected ? 'selected' : '';

            return (
              <Tr
                bgColor={isRowSelected ? 'gray.100' : ''}
                {...row.getRowProps({ key: row.id })}
                className={rowClassName}
              >
                <Td key={`checkbox-cell-${rowIndex}`}>
                  <Checkbox
                    isChecked={isRowSelected}
                    onChange={() => toggleRowSelection(rowIndex)}
                  />
                </Td>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps({ key: cell.column.id })} key={`data-cell-${cell.column.id}`}>
                    {cell.render('Cell')}
                  </Td>
                ))}
                <Td key={`actions-cell-${rowIndex}`}>
                  <HStack spacing={2}>
                    <Menu placement="bottom-end">
                      <MenuButton as={Button} variant="ghost" key="menu-button">
                        <ChevronDownIcon />
                      </MenuButton>
                      <MenuList key="menu-list">
                      {menuItems.map((menuItem, index) => (
                        <MenuItem onClick={() => menuItem.onClick(row.original)} key={`custom-menu-item-${index}`}>
                          {menuItem.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                    </Menu>
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <HStack mt="4" justifyContent="space-between" key="pagination-stack">
        <Text key="page-text">
          Page{' '}
          <strong key="page-strong">
            {pageIndex + 1} of {pageCount}
          </strong>
        </Text>
        <Box key="pagination-box">
          <Button onClick={() => previousPage()} disabled={!canPreviousPage} variant="outline" key="prev-button">
            Previous
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage} variant="outline" key="next-button">
            Next
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}

export default DataTable;
