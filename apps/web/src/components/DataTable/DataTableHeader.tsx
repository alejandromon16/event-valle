import React from 'react';
import { HStack, Input, Checkbox, Button, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const DataTableHeader = ({ search, setSearch, isHide, setHide, colorMode }) => (
  <HStack m={3} justifyContent="space-between">
    <div style={{ display: 'flex' }}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaSearch style={{ color: '#4a5568' }} />}
        />
        <Input
          placeholder="Search Task"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </InputGroup>

      <Checkbox
        style={{ whiteSpace: 'nowrap' }}
        colorScheme={colorMode === 'light' ? 'pink' : 'blue'}
        isChecked={isHide}
        onChange={(event) => setHide(event.target.checked)}
      >
        Hide Complete
      </Checkbox>
    </div>

    <Button colorScheme={colorMode === 'light' ? 'pink' : 'blue'} variant="solid">
      Create User
    </Button>
  </HStack>
);

export default DataTableHeader;
