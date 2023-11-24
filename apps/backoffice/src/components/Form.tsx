import React, { useState, useEffect, ChangeEvent } from 'react';
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  InputLeftAddon,
  InputGroup,
  Textarea,
  Box,
  Heading,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { date, string, z, ZodError } from 'zod';
import { DatePicker, Space } from 'antd';
import DateTimePicker from './DateTimePicker';


const { RangePicker } = DatePicker;

export enum InputFieldType {
  Text = 'text',
  Select = 'select',
  MultiSelect = 'multi-select',
  Phone = 'phone',
  Date = 'date',
  TextArea= 'textarea',
}

interface InputFieldConfig {
  type: InputFieldType;
  options?: string[];
}

interface FormProps<T extends z.ZodObject<any, any, any>> {
  onCancel: () => void;
  onSubmit: (data: z.infer<T>) => void;
  schema: T;
  title: string;
  submitButtonText: string;
  formData?: z.infer<T> | undefined;
  fieldConfig?: Record<string, InputFieldConfig>;
}

const Form = <T extends z.ZodObject<any, any, any>>({
  onCancel,
  onSubmit,
  schema,
  title,
  submitButtonText,
  formData,
  fieldConfig = {},
}: FormProps<T>) => {
  const [formState, setFormState] = useState(formData || ({} as z.infer<T>));
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    setFormState(formData || ({} as z.infer<T>));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, isMultiSelect = false) => {
    const { name, value } = e.currentTarget;

    if (isMultiSelect) {
      setFormState((prevData) => ({
        ...prevData,
        [name]: (value.split(',') as string[]),
      }));
    } else {
      setFormState((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date:string, name:string) => {
    setFormState((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  }




  const clearErrors = () => setErrors({});

  const handleValidationErrors = (error: ZodError) => {
    const newErrors: Record<string, string> = {};
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      newErrors[path] = err.message;
    });
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    try {
      console.log(formState)
      schema.parse(formState);
      clearErrors();
      onSubmit(formState);
    } catch (error) {
      if (error instanceof ZodError) {
        handleValidationErrors(error);
      }
    }
  };

  const renderInputField = (field: z.ZodTypeAny, key: string) => {
    const label: string = schema.shape.labels?.[key] || key;

    const config = fieldConfig[key];
    const fieldType = config?.type || InputFieldType.Text;

    switch (fieldType) {
      case InputFieldType.Date:
        return renderDateField(label,key)
      case InputFieldType.TextArea:
        return renderTextAreaField(label,key);
      case InputFieldType.Phone:
        return renderPhoneField(label,key);
      case InputFieldType.Text:
        return renderTextField(label, key);
      case InputFieldType.Select:
        return renderSelectField(label, key, config?.options || []);
      case InputFieldType.MultiSelect:
        return renderMultiSelectField(label, key, config?.options || []);
      default:
        return null; // Unknown field type, you can handle this case as needed
    }
  };

  const renderDateField = (label: string, key: string) => {
    return (
      <FormControl mt={4} isInvalid={!!errors[key]} key={key}>
        <FormLabel fontWeight="medium" textTransform={'capitalize'}>
          {label}
        </FormLabel>
        <DateTimePicker
          name={key}
          onChange={handleDateChange}
          value={formState[key]}
        />
        <Text color="red.500">{errors[key]}</Text>
      </FormControl>
    );
  };

  const renderPhoneField = (label: string, key: string) => {

    return (
      <FormControl mt={4} isInvalid={!!errors[key]} key={key}>
        <FormLabel fontWeight="medium" textTransform={'capitalize'}>{label}</FormLabel>
        <InputGroup>
          <InputLeftAddon children='+591' />
          <Input name={key} onChange={handleChange} value={formState[key]} type='tel' placeholder='phone number' />
        </InputGroup>
        <Text color="red.500">{errors[key]}</Text>
      </FormControl>
    );
  };

  const renderTextAreaField = (label: string, key: string) => {
    return (
      <FormControl mt={4} isInvalid={!!errors[key]} key={key}>
        <FormLabel fontWeight="medium" textTransform={'capitalize'}>{label}</FormLabel>
        <Textarea name={key} value={formState[key]} onChange={(e) => handleChange(e as ChangeEvent<HTMLTextAreaElement>)} placeholder='Descripcion del evento' />
        <Text color="red.500">{errors[key]}</Text>
      </FormControl>
    );
  };



  const renderTextField = (label: string, key: string) => {
    return (
      <FormControl mt={4} isInvalid={!!errors[key]} key={key}>
        <FormLabel fontWeight="medium" textTransform={'capitalize'}>{label}</FormLabel>
        <Input name={key} type="text" value={formState[key]} onChange={handleChange} />
        <Text color="red.500">{errors[key]}</Text>
      </FormControl>
    );
  };


  const renderSelectField = (label: string, key: string, options: string[]) => {
    return (
      <FormControl mt={4} isInvalid={!!errors[key]} key={key}>
        <FormLabel fontWeight="medium" textTransform={'capitalize'}>{label}</FormLabel>
        <Select name={key} value={formState[key]} onChange={(e) => handleChange(e)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Text color="red.500">{errors[key]}</Text>
      </FormControl>
    );
  };

  const renderMultiSelectField = (label: string, key: string, options: string[]) => {
    return (
      <FormControl mt={4} isInvalid={!!errors[key]} key={key}>
        <FormLabel fontWeight="medium" textTransform={'capitalize'}>{label}</FormLabel>
        <Select
          name={key}
          value={(formState[key] as string[]).join(',')}
          onChange={(e) => handleChange(e, true)}
          multiple
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Text color="red.500">{errors[key]}</Text>
      </FormControl>
    );
  };

  const renderFormFields = () => {
    const shape = schema.shape as Record<string, z.ZodTypeAny>;

    return Object.entries(shape).map(([key, field]) => {
      return renderInputField(field, key);
    });
  };

  return (
    <Flex
      marginTop="10"
      marginBottom="20"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        backgroundColor="white"
        paddingX="20"
        paddingY="10"
        borderRadius="md"
        boxShadow="md"
        width="60vw"
      >
        <Heading fontSize="28" textAlign="center" marginBottom="4">
          {title}
        </Heading>
        <Box>
          <SimpleGrid
            spacingY="5"
          >
            {renderFormFields()}
          </SimpleGrid>
        </Box>
        <Flex justifyContent="flex-end" marginTop="4">
          <Button variant="ghost" onClick={onCancel} marginRight="2">
            Cancel
          </Button>
          <Button colorScheme="pink" onClick={handleSubmit}>
            {submitButtonText}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Form;
