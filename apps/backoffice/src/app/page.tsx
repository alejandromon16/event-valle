"use client"
import React, { useState } from 'react';
import { Box, Button, Input, InputGroup, InputRightElement, Stack, Heading, Text, VStack, Image, useToast } from '@chakra-ui/react'
import { LoginInput, useLoginMutation } from '@/types';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'next/navigation';
import graphqlRequestClient from '../providers/graphql';
import axios from 'axios';

function Login() {
  const [loginInput, setLoginInput] = useState<LoginInput>({ email: '', password: '' });
  const [show, setShow] = React.useState(false);
  const { email, password } = loginInput;
  const toast = useToast();
  const router = useRouter();
  const authStore = useAuthStore();

  const { mutate: loginMutation } = useLoginMutation(
    graphqlRequestClient,
    {
      async onSuccess(data) {
        const res = await axios.post('/api/auth')
        const roles = data.login.roles.map((role) => role['name'])
        useAuthStore.getState().login(data.login, roles)
        router.push('/admin')
        console.log('go admin')
      },
      onError(error: any) {
        console.log(error)
        toast({
          title:"Credenciales invalido",
          status: 'error',
          description: "intenta corrigiendo tu correo o contrasena",
          position: 'bottom-right'
        })
      },
    }
  )

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
      input: loginInput
    })
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
                   <InputGroup size='md' marginBottom={4}>
                   <Input
                     name="password"
                     value={password}
                     onChange={handleInputChange}
                     pr='4.5rem'
                     type={show ? 'text' : 'password'}
                     placeholder='Enter password'
                   />
                   <InputRightElement width='4.5rem'>
                   <Button h='1.75rem' size='sm' onClick={() => setShow(prevShow => !prevShow)}>
                      {show ? 'Ocultar' : 'Mostrar'}
                    </Button>
                   </InputRightElement>
               </InputGroup>
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
