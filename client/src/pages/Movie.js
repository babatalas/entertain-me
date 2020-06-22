import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Container, Row, Button } from "react-bootstrap";
import { GET_ALL_MOVIES } from "../graphql/queries";
import MovieList from "../components/MovieList";

function Movie() {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);
  const history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="pt-5">
      <Row className="d-flex flex-row justify-content-between">
        <Button onClick={() => history.push("/movies/create")}>
          Create new movie
        </Button>
        <Button onClick={() => history.push("/movies/favorites")}>
          View Favorite Movies
        </Button>
      </Row>
      <MovieList movies={data.movies} />
    </Container>
  );
}

export default Movie;
