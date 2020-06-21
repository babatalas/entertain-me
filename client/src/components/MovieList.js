import React from "react";
import { CardColumns } from "react-bootstrap";
import MovieListItem from "./MovieListItem";

function MovieList(props) {
  const { movies } = props;
  return (
    <CardColumns className="mt-5">
      {movies.map((movie) => (
        <MovieListItem key={movie._id} movie={movie} />
      ))}
    </CardColumns>
  );
}

export default MovieList;
