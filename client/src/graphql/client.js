import ApolloClient from "apollo-boost";
import { GET_FAVORITE_MOVIES, GET_FAVORITE_TV_SERIES } from "./queries";

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
        addTvSeriesToFavorite: (_, variables, client) => {
          const { favoriteTvSeries } = client.cache.readQuery({
            query: GET_FAVORITE_TV_SERIES,
          });
          const series = {
            ...variables,
            tags: [...variables.tags],
            __typename: "FavoriteTvSeries",
          };
          const newFavoriteTvSeries = [...favoriteTvSeries, series];
          client.cache.writeData({
            data: {
              favoriteTvSeries: newFavoriteTvSeries,
            },
          });
        },
        removeTvSeriesFromFavorite: (_, variables, client) => {
          console.log("masuk remove", variables)
          const { favoriteTvSeries } = client.cache.readQuery({
            query: GET_FAVORITE_MOVIES,
          });
          const newFavoriteTvSeries = favoriteTvSeries.filter(
            (series) => series._id !== variables._id
          );
          client.cache.writeData({
            data: {
              favoriteTvSeries: newFavoriteTvSeries,
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
