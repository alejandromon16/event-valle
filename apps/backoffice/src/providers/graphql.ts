import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';

const GRAPHQL_ENDPOINT = 'http://localhost:8000/graphql'

const graphqlRequestClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  credentials: 'include',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

export default graphqlRequestClient;
