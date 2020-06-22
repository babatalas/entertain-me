import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { DELETE_MOVIE, ADD_MOVIE_TO_FAVORITE_MOVIES, GET_ALL_MOVIES } from "../graphql/queries";

function MovieListItem(props) {
  const { movie, isInFavoriteMovies } = props;

  const history = useHistory();
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    update(cache, { data: { deleteMovie }}) {
      const { movies } = cache.readQuery({ query: GET_ALL_MOVIES })
      cache.writeQuery({
        query: GET_ALL_MOVIES,
        data: {
          movies: movies.filter((movie) => movie._id !== deleteMovie._id),
        },
      });
    }
  });
  const [addMovieToFavoriteMovies] = useMutation(ADD_MOVIE_TO_FAVORITE_MOVIES);

  const seeMovieDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/movies/${id}`);
  };

  const editMovieDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/movies/edit/${id}`);
  };

  const addMovieToFavoriteMoviesHandle = async (movie) => {
    const { _id, title, overview, poster_path, popularity, tags } = movie;
    await addMovieToFavoriteMovies({
      variables: {
        id: _id,
        title,
        overview,
        poster_path,
        popularity,
        tags,
      },
    });
  };

  const deleteMovieHandle = async (id) => {
    await deleteMovie({
      variables: {
        id: movie._id,
      },
    });
    console.log("Delete movie done!");
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
            <Button
              className="mt-2"
              variant="success"
              disabled={isInFavoriteMovies ? true : false}
              onClick={() => addMovieToFavoriteMoviesHandle(movie)}
            >
              Add To Favorites
            </Button>
          </div>
          <div className="d-flex flex-column justify-content-between">
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
        </div>
      </Card.Body>
    </Card>
  );
}

export default MovieListItem;
