const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const movieSchema = require("./schemas/movieSchema");
const tvSeriesSchema = require("./schemas/tvSeriesSchema");

const typeDefs = gql`
  type DeleteResponse {
    n: Int
    ok: Int
  }
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [typeDefs, movieSchema.typeDefs, tvSeriesSchema.typeDefs],
  resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers],
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀🚀 Server ready at ${url}`);
});
