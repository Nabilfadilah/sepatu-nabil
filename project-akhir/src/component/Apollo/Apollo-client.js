// import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
// import { getMainDefinition } from "@apollo/client/utilities";
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";

// const httpLink = new HttpLink({
//   uri: "https://direct-sole-57.hasura.app/v1/graphql",
//   headers: {
//     "x-hasura-admin-secret":
//       "jtTbklCM13RJLZC2fdlV8fJV9Rq4wT26ESv8BXxS0QZsUWsFaqe0zv07W6ccItzh",
//   },
// });

// const wsLink = new GraphQLWsLink(
//   createClient({
//     url: "wss://direct-sole-57.hasura.app/v1/graphql",
//     connectionParams: {
//       headers: {
//         "x-hasura-admin-secret":
//           "jtTbklCM13RJLZC2fdlV8fJV9Rq4wT26ESv8BXxS0QZsUWsFaqe0zv07W6ccItzh",
//       },
//     },
//   })
// );
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache(),
// });

// export default client;
