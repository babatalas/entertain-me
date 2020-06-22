const { gql } = require("apollo-server");
const axios = require("axios");
const redis = require("../redis");
const moviesAPI = process.env.MOVIES_SERVICE_API + "/movies";

const typeDefs = gql`
  type Movie {
    _id: String
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  input UpdateMovie {
    _id: ID!
    data: InputMovie
  }

  input InputMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Int!
    tags: [String]!
  }

  extend type Query {
    movies: [Movie]
    getMovie(_id: ID!): Movie
  }

  extend type Mutation {
    createMovie(movie: InputMovie): Movie
    updateMovie(movie: UpdateMovie): Movie
    deleteMovie(_id: ID!): DeleteResponse
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const moviesInCache = await redis.get("movies");
        if (moviesInCache) return JSON.parse(moviesInCache);

        const { data: movies } = await axios.get(moviesAPI);
        redis.set("movies", JSON.stringify(movies));
        return movies;
      } catch (error) {
        return error;
      }
    },
    getMovie: async (_, args) => {
      try {
        const { _id } = args;
        const movieByIdInCache = await redis.get("movie:" + _id);
        if (movieByIdInCache) return JSON.parse(movieByIdInCache);

        const { data: movie } = await axios.get(`${moviesAPI}/${_id}`);
        redis.set("movie:" + _id, JSON.stringify(movie));
        return movie;
      } catch (error) {
        return error;
      }
    },
  },

  Mutation: {
    createMovie: async (_, args) => {
      try {
        const { title, overview, poster_path, popularity, tags } = args.movie;
        const newMovie = {
          title,
          overview,
          poster_path,
          popularity,
          tags,
        };
        const { data: movie } = await axios.post(moviesAPI, newMovie);
        redis.del("movies");
        redis.set("movie:" + movie._id, JSON.stringify(movie));
        return movie;
      } catch (error) {
        return error;
      }
    },

    updateMovie: async (_, args) => {
      try {
        const { _id, data } = args.movie;
        const {
          data: { value: updatedMovie },
        } = await axios.put(`${moviesAPI}/${_id}`, data);
        if (updatedMovie) {
          redis.del("movies");
          redis.set("movie:" + _id, JSON.stringify(updatedMovie));
        }
        return updatedMovie;
      } catch (error) {
        return error;
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { _id } = args;
        const { data: response } = await axios.delete(`${moviesAPI}/${_id}`);

        if (response.n) {
          redis.del("movie:" + _id);
          redis.del("movies");
        }
        return response;
      } catch (error) {
        return error;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
