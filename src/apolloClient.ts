import { HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { ApolloClient } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://syn-api-prod.herokuapp.com/graphql",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});
