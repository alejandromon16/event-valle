import React from 'react';
import { Box } from '@chakra-ui/react';
import CompactTable from '@table-library/react-table-library/compact';

const DataTableTable = ({COLUMNS, data, search, isHide, select, sort, pagination, theme, colorMode }) => (
  <Box p={3} borderWidth="1px" borderRadius="lg">
    <CompactTable
      columns={COLUMNS}
      data={{ ...data, nodes: modifiedNodes }}
      theme={theme}
      layout={{ custom: true }}
      select={select}
      sort={sort}
      pagination={pagination}
    />
  </Box>
);

export default DataTableTable;
