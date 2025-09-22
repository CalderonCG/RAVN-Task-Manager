import { HttpLink, from } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import DebounceLink from "apollo-link-debounce";

const debounceLink = new DebounceLink(300); // 300ms delay

// HTTP link
const httpLink = new HttpLink({
  uri: "https://syn-api-prod.herokuapp.com/graphql",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

// Client
export const client = new ApolloClient({
  link: from([debounceLink, httpLink]),
  cache: new InMemoryCache(),
});
