import React from 'react';
import { HStack, Button, IconButton } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DataTablePagination = ({ pagination, colorMode, modifiedNodes }) => (
  <>
    <HStack justify="flex-end">
      <IconButton
        aria-label="previous page"
        icon={<FaChevronLeft />}
        colorScheme={colorMode === 'light' ? 'pink' : 'blue'}
        variant="ghost"
        disabled={pagination.state.page === 0}
        onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
      />

      {pagination.state.getPages(modifiedNodes).map((_, index) => (
        <Button
          key={index}
          colorScheme={colorMode === 'light' ? 'pink' : 'blue'}
          variant={pagination.state.page === index ? 'solid' : 'ghost'}
          onClick={() => pagination.fns.onSetPage(index)}
        >
          {index + 1}
        </Button>
      ))}
      
      <IconButton
        aria-label="next page"
        icon={<FaChevronRight />}
        colorScheme={colorMode === 'light' ? 'pink' : 'blue'}
        variant="ghost"
        disabled={pagination.state.page + 1 === pagination.state.getTotalPages(data.nodes)}
        onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
      />
    </HStack>
  </>
);

export default DataTablePagination;
