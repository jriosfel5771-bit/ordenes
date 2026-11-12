import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

const ordersUrl = process.env.ORDERS_SERVICE_URL ?? 'http://localhost:5080/graphql';

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [{ name: 'orders', url: ordersUrl }],
    pollIntervalInMs: 10_000,
  }),
});

const server = new ApolloServer({ gateway });

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT ?? 4000) },
});

console.log(`Gateway listo en ${url}`);