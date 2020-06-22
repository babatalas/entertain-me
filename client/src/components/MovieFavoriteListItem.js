import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { REMOVE_MOVIE_FROM_FAVORITE_MOVIES } from "../graphql/queries";

function MovieFavoriteListItem(props) {
  const { movie } = props;
  const history = useHistory();

  const [removeMovieFromFavoriteMovies] = useMutation(
    REMOVE_MOVIE_FROM_FAVORITE_MOVIES,
    {
      variables: {
        id: movie._id,
      },
    }
  );

  const seeMovieDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/movies/${id}`);
  };

  return (
    <Card>
      <Card.Img variant="top" src={movie.poster_path} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Popularity : {movie.popularity}</Card.Text>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <Button
              className="mt-2"
              variant="primary"
              href={`/movies/${movie._id}`}
              onClick={(e) => seeMovieDetailHandle(e, movie._id)}
            >
              See Detail
            </Button>
          </div>
          <div className="d-flex flex-column justify-content-between">
            <Button
              className="mt-2"
              variant="danger"
              onClick={removeMovieFromFavoriteMovies}
            >
              Remove From Favorites
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieFavoriteListItem;
