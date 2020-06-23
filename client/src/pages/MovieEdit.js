import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { GET_MOVIE_DETAIL } from "../graphql/queries";
import { Container, Card } from "react-bootstrap";
import MovieEditForm from "../components/MovieEditForm";
import TheLoading from "../components/TheLoading";

function MovieEdit() {
  const { movieId } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      id: movieId,
    },
  });

  if (loading) return <TheLoading />;
  if (error) return <p>Error...</p>;
  
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>Edit Movie Form</Card.Header>
        <Card.Body>
          <MovieEditForm movie={data.getMovie} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MovieEdit;
