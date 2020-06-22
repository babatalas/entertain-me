if (process.env.NODE_END !== "production") require("dotenv").config();
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
  cors: false,
});

const server = new ApolloServer({ schema });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀🚀 Server ready at ${url}`);
});
