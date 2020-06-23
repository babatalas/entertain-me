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

export const GET_ALL_TV_SERIES = gql`
  {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const GET_TV_SERIES_DETAIL = gql`
  query getTvSeries($id: ID!) {
    getTvSeries(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const CREATE_TV_SERIES = gql`
  mutation createTvSeries(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Int!
    $tags: [String]!
  ) {
    createTvSeries(
      tvSeries: {
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

export const DELETE_TV_SERIES = gql`
  mutation deleteTvSeries($id: ID!) {
    deleteTvSeries(_id: $id) {
      _id
      n
      ok
    }
  }
`;

export const UPDATE_TV_SERIES = gql`
  mutation updateTvSeries(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Int!
    $tags: [String]!
  ) {
    updateTvSeries(
      tvSeries: {
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

export const ADD_TV_SERIES_TO_FAVORITE = gql`
  mutation addTvSeriesToFavorite(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Int!
    $tags: [String]!
  ) {
    addTvSeriesToFavorite(
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

export const REMOVE_TV_SERIES_FROM_FAVORITE = gql`
  mutation removeTvSeriesFromFavorite($id: ID!) {
    removeTvSeriesFromFavorite(_id: $id) @client
  }
`;

export const GET_FAVORITE_TV_SERIES = gql`
  query {
    favoriteTvSeries @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;
