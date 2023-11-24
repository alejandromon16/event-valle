import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';

function Page() {
  return (
    <Box
      position="absolute"
      top="0"
      bottom="0"
      left="0"
      right="0"
      zIndex="100"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="375px"
        height="667px"
        overflow="hidden"
        position="relative"
      >
        <Image
          src="/phone.png"
          alt="Phone Image"
          width="100%"
          height="100%"
          objectFit="cover"
          position="absolute"
          top="0"
          right="0"
          left="0"
          bottom="0"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          zIndex="-1"
        />

        <Flex
          direction="column"
          height="full"
          marginY="39"
          marginX="30"
          paddingX="3"
          paddingTop="6"
        >
          <Box
            marginX="1"
            height="10"
            backgroundColor="white"
            borderBottom="1px solid #ddd"
          >
            <Heading
              fontSize="20"
              paddingX="4"
              justifyContent="end"
              alignItems="baseline"
            >Eventos
            </Heading>

            <Box
              marginX="4"
              marginTop="10"
              padding="4"
              height="200"
              backgroundColor="#f0f0f0"
              borderRadius="md"
              boxShadow="md"
            >
              <Text fontSize="16" >Card Content Goes Here</Text>
              {/* Add more elements as needed */}
            </Box>

          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Page;


