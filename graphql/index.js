const { ApolloServer, gql } = require("apollo-server");

// Define los tipos y resolvers para la API
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hola, mundo!",
  },
};

// Crea el servidor de Apollo
const server = new ApolloServer({ typeDefs, resolvers });

// Inicia el servidor
server.listen().then(({ url }) => {
  console.log(`Servidor iniciado en ${url}`);
});
