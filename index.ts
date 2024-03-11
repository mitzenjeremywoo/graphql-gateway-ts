import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "product", url: "http://localhost:4001" },
      { name: "review", url: "http://localhost:4002" },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

server
  .listen({
    port: 4000,
  })
  .then(({ url }: { url: string }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });