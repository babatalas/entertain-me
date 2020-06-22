import ApolloClient from "apollo-boost";
import { GET_FAVORITE_MOVIES } from "./queries";

const client = new ApolloClient({
  uri: process.env.REACT_APP_ORCHESTRATOR_URL,
  clientState: {
    resolvers: {
      Mutation: {
        addMovieToFavoriteMovies: (_, variables, client) => {
          const { favoriteMovies } = client.cache.readQuery({
            query: GET_FAVORITE_MOVIES,
          });
          const movie = {
            ...variables,
            tags: [...variables.tags],
            __typename: "FavoriteMovie",
          };
          const newFavoriteMovies = [...favoriteMovies, movie];
          client.cache.writeData({
            data: {
              favoriteMovies: newFavoriteMovies,
            },
          });
        },
        removeMovieFromFavoriteMovies: (_, variables, client) => {
          console.log("masuk remove", variables)
          const { favoriteMovies } = client.cache.readQuery({
            query: GET_FAVORITE_MOVIES,
          });
          const newFavoriteMovies = favoriteMovies.filter(
            (movie) => movie._id !== variables._id
          );
          client.cache.writeData({
            data: {
              favoriteMovies: newFavoriteMovies,
            },
          });
        },
      },
    },
    defaults: {
      favoriteMovies: [],
      favoriteTvSeries: [],
    },
  },
});

export default client;
