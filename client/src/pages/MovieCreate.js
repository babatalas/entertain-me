import React from "react";
import { Container, Card } from "react-bootstrap";
import MovieCreateForm from "../components/MovieCreateForm";

function MovieCreate() {
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>Create Movie Form</Card.Header>
        <Card.Body>
          <MovieCreateForm />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MovieCreate;
