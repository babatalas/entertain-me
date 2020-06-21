import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { DELETE_MOVIE } from "../graphql/queries";

function MovieListItem(props) {
  const { movie } = props;
  const history = useHistory();
  const [deleteMovie] = useMutation(DELETE_MOVIE);
  const seeMovieDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/movies/${id}`);
  };
  const editMovieDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/movies/edit/${id}`);
  };
  const deleteMovieHandle = async (e, id) => {
    e.preventDefault();
    await deleteMovie({
      variables: {
        id: movie._id
      }
    })
  };

  return (
    <Card>
      <Card.Img variant="top" src={movie.poster_path} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Popularity : {movie.popularity}</Card.Text>
        <div className="d-flex flex-wrap justify-content-between">
          <Button
            className="mt-2"
            variant="primary"
            href={`/movies/${movie._id}`}
            onClick={(e) => seeMovieDetailHandle(e, movie._id)}
          >
            See Detail
          </Button>
          <Button
            className="mt-2"
            variant="info"
            href={`/movies/edit/${movie._id}`}
            onClick={(e) => editMovieDetailHandle(e, movie._id)}
          >
            Edit
          </Button>
          <Button
            className="mt-2"
            variant="danger"
            onClick={(e) => deleteMovieHandle(e, movie._id)}
          >
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieListItem;
