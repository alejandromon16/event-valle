'use client'
import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Spacer
} from '@chakra-ui/react';
import { EventEntity, GetEventByIdQuery, useGetEventByIdQuery } from '@/types';
import graphqlRequestClient from '@/src/providers/graphql';
import { Event } from '@prisma/client';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [ detailsEventActive, setDetailsEventActive ] = useState<boolean>(false);
  const [eventData, setEventData] = useState<Partial<EventEntity> | undefined>(undefined);
  const { data, isLoading, isError } = useGetEventByIdQuery(
    graphqlRequestClient,
    {
      input: {
        eventId: params.id,
      },
    },
  );

  useEffect(() => {
    if (data) {
      const event = data.getEventById
      setEventData({
        title: event.title,
        startDate: new Date(event.startDate).toLocaleString(),
      });
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading event data</div>;
  }

  const startDate = new Date(data.getEventById.startDate);

  return (
    <>
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
              >
                Eventos
              </Heading>

              {!detailsEventActive && (
              <Box
                position="relative"
                marginX="4"
                marginTop="10"
                height="200"
                backgroundColor="#f0f0f0"
                borderRadius="md"
                boxShadow="md"
                onClick={() => setDetailsEventActive(true)}
              >
                <Image
                  src={data.getEventById.principalImage}
                  width="100%"
                  height="100%"
                  alt="image"
                  borderRadius="md"
                  objectFit="cover"
                  blendMode="darken"
                />

                <Box
                  borderRadius="md"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  position="absolute"
                  backgroundColor="rgba(0, 0, 0, 0.5)"
                  zIndex="10"
                >
                  <Box
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                    padding={2}
                  >
                    <Image
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWIotHotczo-GHEp_iWoQVBC-MjeWvniZyZmNy7X6Lgw&s'
                      width={7}
                      height={7}
                      borderRadius={30}
                      alt="imag"
                    />
                    <Box
                      marginX={2}
                    >
                      <Text fontSize="xs" fontWeight="bold" color={"white"}>Alejandro Montero</Text>
                      <Text fontSize="xs" fontWeight="thin" color={"white"}>Publicado 20 martes 20:30</Text>
                    </Box>
                  </Box>
                  <Spacer height={5} />
                    <Box
                      marginX={3}
                    >
                    <Text fontSize={26} fontWeight={"bold"} color={"white"}>{eventData?.title}</Text>
                  </Box>
                  <Spacer height={2} />
                  <Box
                      marginX={3}
                      backgroundColor="blackAlpha.400"
                      borderRadius={10}
                    >
                    <Text fontSize={14} fontWeight={"bold"} color={"white"}>{eventData?.startDate}</Text>
                  </Box>
                </Box>
              </Box>
               )}
              {detailsEventActive && (
                <Box>
                  holo
                </Box>
              )}

            </Box>
          </Flex>
        </Box>
      </Box>

    </>
  );
};

export default Page;
