import * as React from 'react';

import { useCustom } from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { useRowSelect } from '@table-library/react-table-library/select';
import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import {
  useColorMode,
} from '@chakra-ui/react';
import {
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { useState } from 'react';
import DataTableHeader from './DataTableHeader';
import DataTableTable from './DataTableTable';
import DataTablePagination from './DataTablePagination';


const DataTable2 = ({columns, datas}) => {
  const [data, setData] = useState(datas);
  const { colorMode } = useColorMode();

  // ... Theme, Resize, Pagination, Search, Filter, Select, Tree, Sort, and other code

  const chakraTheme = getTheme({
    ...DEFAULT_OPTIONS,
    striped: false,
  });
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns:  64px repeat(5, minmax(0, 1fr));
      margin: 16px 0px;
    `,
    HeaderRow: `
      background-color: ${colorMode === "light" ? '': '#1a202c'};

    `,
    BaseCell: `
      background-color: ${colorMode === "light" ? '': '#1a202c'};
    `,
    Cell: `
      background-color: ${colorMode === "light" ? '': '#1a202c'};
      `,
  };
  const theme = useTheme([chakraTheme, customTheme]);
  const resize = { resizerHighlight: '#dee2e6' };


  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 4,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  const [search, setSearch] = React.useState('');

  useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action, state) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  const [isHide, setHide] = React.useState(false);

  useCustom('filter', data, {
    state: { isHide },
    onChange: onFilterChange,
  });

  function onFilterChange(action, state) {
    console.log(action, state);
    pagination.fns.onSetPage(0);
  }

  //* Select *//

  const select = useRowSelect(data, {
    onChange: onSelectChange,
  });

  function onSelectChange(action, state) {
    console.log(action, state);
  }

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) => array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  //* Drawer *//

  const [drawerId, setDrawerId] = React.useState(null);
  const [edited, setEdited] = React.useState('');

  const handleEdit = (event) => {
    setEdited(event.target.value);
  };

  const handleCancel = () => {
    setEdited('');
    setDrawerId(null);
  };

  const handleSave = () => {
    setData({
      nodes,
    });

    setEdited('');
    setDrawerId(null);
  };

  //* Custom Modifiers *//

  let modifiedNodes = data.nodes;

  // search
  modifiedNodes = modifiedNodes.filter((node) =>
    node.name.toLowerCase().includes(search.toLowerCase()),
  );

  // filter
  modifiedNodes = isHide ? modifiedNodes.filter((node) => !node.isComplete) : modifiedNodes;

  return (
    <>
      <DataTableHeader search={search} setSearch={setSearch} isHide={isHide} setHide={setHide} colorMode={colorMode} />
      <DataTableTable COLUMNS={columns} data={data} search={search} isHide={isHide} select={select} sort={sort} pagination={pagination} theme={theme} colorMode={colorMode} />
      <DataTablePagination pagination={pagination} colorMode={colorMode} modifiedNodes={modifiedNodes}/>
    </>
  );
};

export default DataTable2;
