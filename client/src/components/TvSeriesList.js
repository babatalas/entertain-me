import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CardColumns } from "react-bootstrap";
import { GET_FAVORITE_MOVIES } from "../graphql/queries";
import MovieFavoriteListItem from "./MovieFavoriteListItem";
import MovieListItem from "./MovieListItem";

function MovieList(props) {
  const { movies } = props;
  const {
    data: { favoriteMovies },
  } = useQuery(GET_FAVORITE_MOVIES);

  console.log(favoriteMovies);

  return (
    <CardColumns className="mt-5">
      {
        movies.map((movie) => (movie.__typename === "FavoriteMovie"
        ? (<MovieFavoriteListItem
            key={movie._id}
            movie={movie}
            isInFavoriteMovies={favoriteMovies.some(el => el._id === movie._id)}
          />)
        : (<MovieListItem
            key={movie._id}
            movie={movie}
            isInFavoriteMovies={favoriteMovies.some(el => el._id === movie._id)}
          />)))
      }
    </CardColumns>
  );
}

export default MovieList;
