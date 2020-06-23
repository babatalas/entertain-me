import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "react-bootstrap";
import { GET_FAVORITE_MOVIES } from "../graphql/queries";
import MovieList from "../components/MovieList";
import MovieSubMenu from "../components/MovieSubMenu";
import TheLoading from "../components/TheLoading";

function MovieFavorites() {
  const { loading, error, data } = useQuery(GET_FAVORITE_MOVIES);

  if (loading) return <TheLoading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <MovieSubMenu />
      <MovieList movies={data.favoriteMovies} />
    </Container>
  );
}

export default MovieFavorites;
