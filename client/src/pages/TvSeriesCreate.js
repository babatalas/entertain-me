import React from "react";
import { Container, Card } from "react-bootstrap";
import TvSeriesCreateForm from "../components/TvSeriesCreateForm";

function TvSeriesCreate() {
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>Create Tv Series Form</Card.Header>
        <Card.Body>
          <TvSeriesCreateForm />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TvSeriesCreate;
