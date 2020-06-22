import { gql } from "apollo-boost";

export const GET_ALL_MOVIES = gql`
  {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_MOVIE_DETAIL = gql`
  query getMovie($id: ID!) {
    getMovie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation createMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Int!
    $tags: [String]!
  ) {
    createMovie(
      movie: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(_id: $id) {
      _id
      n
      ok
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation updateMovie(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Int!
    $tags: [String]!
  ) {
    updateMovie(
      movie: {
        _id: $id
        data: {
          title: $title
          overview: $overview
          poster_path: $poster_path
          popularity: $popularity
          tags: $tags
        }
      }
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE_TO_FAVORITE_MOVIES = gql`
  mutation addMovieToFavoriteMovies(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Int!
    $tags: [String]!
  ) {
    addMovieToFavoriteMovies(
      _id: $id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tags: $tags
    ) @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const REMOVE_MOVIE_FROM_FAVORITE_MOVIES = gql`
  mutation removeMovieFromFavoriteMovies($id: ID!) {
    removeMovieFromFavoriteMovies(_id: $id) @client
  }
`;

export const GET_FAVORITE_MOVIES = gql`
  query {
    favoriteMovies @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
