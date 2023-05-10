// Sudah di rubah

import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

// digunakan untuk membuat instance dari HttpLink, sebuah objek yang merepresentasikan 
// GraphQL yang digunakan untuk melakukan query, mutation, atau subscription ke server GraphQL.
const httpLink = new HttpLink({
    uri: "https://advanced-mayfly-48.hasura.app/v1/graphql",
    headers: {
        "x-hasura-admin-secret":
        "dRRrT2o0cwH8COUmlvpcCJwRx0KZCdUHm4cUeacM2edKVp9i9VsOaa01IsNxiaRB",
    },
});

// link-ws, yang digunakan untuk membuat koneksi WebSocket ke Hasura GraphQL. 
// denngan menggunakan metode createClient untuk mengonfigurasi koneksi WebSocket 
// dan meneruskan parameter koneksi yang diperlukan.
const wsLink = new GraphQLWsLink(
    createClient({
        url: "wss://advanced-mayfly-48.hasura.app/v1/graphql",
        connectionParams: {
        headers: {
            "x-hasura-admin-secret":
            "dRRrT2o0cwH8COUmlvpcCJwRx0KZCdUHm4cUeacM2edKVp9i9VsOaa01IsNxiaRB",
        },
        },
    })
);

// fungsi split() memeriksa apakah kueri yang masuk adalah benar ?, dan jika ya, 
// akan mengarahkan kueri ke wsLink melalui soket web.
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

// variabel client digunakan untuk membuat instance dari ApolloClient. 
// link digunakan untuk mengatur link yang akan digunakan dalam GraphQL. 
// splitLink yang sudah didefinisikan digunakan, 
// untuk membagi link antara wsLink untuk operasi subscription dan httpLink 
// untuk operasi query dan mutation. Sedangkan cache digunakan untuk mengatur 
// cache data yang digunakan oleh Apollo Client.
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

export default client;
