import React, { useState } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Stack, Checkbox, Text } from '@chakra-ui/react';

const MultiSelect = ({ options, selectedOptions, onSelectOption }) => {
  return (
    <Stack spacing={2}>
      {options.map((option) => (
        <Checkbox
          key={option}
          isChecked={selectedOptions.includes(option)}
          onChange={() => onSelectOption(option)}
        >
          {option}
        </Checkbox>
      ))}
    </Stack>
  );
};

const MyMultiSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <Popover placement='bottom-start' isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button width="full" variant="outline" onClick={togglePopover}>
          <Text width="full" textAlign="start" fontWeight="normal">
            {selectedOptions}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Select Options</PopoverHeader>
        <PopoverBody>
          <MultiSelect options={options} selectedOptions={selectedOptions} onSelectOption={handleSelectOption} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MyMultiSelect;
