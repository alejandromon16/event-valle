'use client';
import graphqlRequestClient from '@/src/providers/graphql';
import { useGetAmountOfDraftEventsQuery, useGetAmountOfPublishEventsQuery } from '@/types';
import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);


function Page() {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'rgba(0, 0, 0, 0.8)',
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          color: 'rgba(0, 0, 0, 0)',
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    elements: {
      point: {
        radius: 3,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      line: {
        tension: 0.4,
        borderWidth: 4,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    tooltips: {
      enabled: true,
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        size: 12,
      },
    },
  };


  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.number.int({min: -1000, max: 1000})),
        borderColor: 'rgb(235, 53, 159)',
        backgroundColor: 'rgba(235, 53, 114, 0.5)',
      },
    ],
  };

  const eventsData = [
    { name: 'Event A', likes: 50 },
    { name: 'Event B', likes: 30 },
    { name: 'Event C', likes: 25 },
    // ... add more events
  ];

  // Sort the events based on likes in descending order
  const sortedEvents = eventsData.sort((a, b) => b.likes - a.likes);

  // Take the top 3 events
  const top3Events = sortedEvents.slice(0, 3);

  // Create data for the Pie chart
  const pieChartData = {
    labels: top3Events.map(event => event.name),
    datasets: [
      {
        data: top3Events.map(event => event.likes),
        backgroundColor: ['#FF6384', '#eb368b', '#ff56a5'], // You can customize the colors
      },
    ],
  };

  const { data:amountDraft } = useGetAmountOfDraftEventsQuery(
    graphqlRequestClient,
    {}
  );

  const { data:amountPublish } = useGetAmountOfPublishEventsQuery(
    graphqlRequestClient,
    {}
  )

  const countDraft = amountDraft?.getAmountOfDraftEvents || 0;
  const countPublish = amountPublish?.getAmountOfPublishEvents || 0;

  return (
    <><Box
      display="flex"
      justifyContent="space-evenly"  // Adjusted to "flex-start" for starting alignment
      justifyItems="flex-start"
    >
      <Box
        border="1px solid #dfdbdb7d"
        borderRadius="md"
        p={6}
        margin={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Eventos Publicados
        </Text>
        <Box>
          <Text fontSize="2xl">{countPublish}</Text>
        </Box>
      </Box>

      <Box
        border="1px solid #dfdbdb7d"
        borderRadius="md"
        width={200}
        p={6}
        margin={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Eventos Draft
        </Text>
        <Text fontSize="2xl">{countDraft}</Text>
      </Box>

      <Box
        border="1px solid #dfdbdb7d"
        borderRadius="md"
        p={6}
        margin={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width={200}
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Usuarios
        </Text>
        <Box>
          <Text fontSize="2xl">12</Text>
        </Box>
      </Box>

      <Box
        border="1px solid #dfdbdb7d"
        borderRadius="md"
        p={6}
        margin={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Solicitudes Aprovadas
        </Text>
        <Box>
          <Text fontSize="2xl">10</Text>
        </Box>
      </Box>

      <Box
        border="1px solid #dfdbdb7d"
        borderRadius="md"
        p={6}
        margin={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Solictudes Rechazadas
        </Text>
        <Box>
          <Text fontSize="2xl">7</Text>
        </Box>
      </Box>

      <Box
        border="1px solid #dfdbdb7d"
        borderRadius="md"
        p={6}
        margin={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Solicitudes Pendientes
        </Text>
        <Box>
          <Text fontSize="2xl">{countPublish}</Text>
        </Box>
      </Box>

    </Box>
    <Box
      display="flex"
      marginX={9}
    >
    <Box
      border="1px solid #dfdbdb7d"
      borderRadius="md"
      p={6}
      margin={3}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      width={750}
      boxShadow="md"
    >
        <Text fontSize="lg" fontWeight="bold">
          Likes Diarios
        </Text>
        <Line options={options} data={data} />
      </Box>

     {/* Top 3 Most Liked Events Pie Chart */}
     <Box
        border="1px solid #dfdbdb7d"
        borderRadius="md"
        p={4}
        margin={3}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        width={380} // Adjust the width according to your layout
        boxShadow="md"
      >
        <Text fontSize="lg" fontWeight="bold">
          Top 3 Eventos Likeados
        </Text>
        <Doughnut options={options} data={pieChartData} />
      </Box>


    </Box>



  </>
  );
}

export default Page;
