"use client"

import React, { useState } from 'react';
import { useLoginMutation, LoginInput } from '../../types';
import { Box, Button, Input, InputGroup, InputRightElement, Stack, Heading, Text, VStack, Image } from '@chakra-ui/react'


function PasswordInput() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size='md' marginBottom={4}>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Ocultar' : 'Mostrar'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

function Login() {
  const [loginInput, setLoginInput] = useState<LoginInput>({ email: '', password: '' });
  const { email, password } = loginInput;

  const [loginMutation, { data: loginData, loading: loginLoading, error: loginError }] = useLoginMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginMutation({
      variables: {
        input: loginInput,
      },
    })
      .then((result) => {
        console.log('Mutation Result:', result);
      })
      .catch((error) => {
        console.error('Mutation Error:', error);
      });

    setLoginInput({ email: '', password: '' });
  };

  return (
    <div>
      <Stack height="100vh" direction="column" alignItems="center" justifyContent="center">
        <Box margin="10">
          <Image src='/logo.png' alt='logo' />
        </Box>
        <Box width="550px" boxShadow={'md'} padding={10} borderRadius={'md'}>
          <Heading as="h2" size="md" marginBottom="10">Inicia Sesion en tu cuenta</Heading>
          <form>
            <VStack spacing="6">
              <Box width="full">
                <Text>Email</Text>
                <Input
                  value={email}
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  placeholder='Email'
                />
              </Box>
              <Box width="full">
                <Text>Password</Text>
                <PasswordInput />
              </Box>
              <Box width="full">
                <Button width="full" colorScheme='pink' variant='solid' marginTop={4} onClick={handleSubmit}>
                  Iniciar Sesión
                </Button>
              </Box>
            </VStack>
          </form>
        </Box>
      </Stack>
    </div>
  );
}

export default Login;
