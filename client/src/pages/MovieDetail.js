import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { GET_MOVIE_DETAIL } from "../graphql/queries";
import { Container, Card, Figure, Badge } from "react-bootstrap";

function MovieDetail() {
  const { movieId } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      id: movieId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header as="h4" className="text-center">
          Movie Detail
        </Card.Header>
        <Card.Body>
          <Figure>
            <Figure.Image
              src={data.getMovie.poster_path}
              alt={data.getMovie.title}
            />
            <Figure.Caption>{data.getMovie.title}</Figure.Caption>
          </Figure>
          <Card.Title>{data.getMovie.title}</Card.Title>
          <Card.Text>{data.getMovie.overview}</Card.Text>
          <div>
            {data.getMovie.tags.map((tag, index) => (
              <Badge
                key={index}
                pill
                variant="primary"
                style={{ marginRight: "8px", marginBottom: "8px" }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Popularity : {data.getMovie.popularity}
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default MovieDetail;
