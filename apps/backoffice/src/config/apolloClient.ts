"use client";
import {
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const makeClient = () => {
  const httpLink = new HttpLink({
      uri: 'http://localhost:8000/graphql',
      credentials: 'include'
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export default makeClient
