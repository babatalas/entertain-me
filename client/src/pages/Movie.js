import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "react-bootstrap";
import { GET_ALL_MOVIES } from "../graphql/queries";
import MovieList from "../components/MovieList";
import MovieSubMenu from "../components/MovieSubMenu";
import TheLoading from "../components/TheLoading";

function Movie() {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

  if (loading) return <TheLoading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <MovieSubMenu />
      <MovieList movies={data.movies} />
    </Container>
  );
}

export default Movie;
