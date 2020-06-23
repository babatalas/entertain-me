import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import {
  GET_MOVIE_DETAIL,
  ADD_MOVIE_TO_FAVORITE_MOVIES,
  GET_FAVORITE_MOVIES,
} from "../graphql/queries";
import { Container, Card, Figure, Badge, Button } from "react-bootstrap";
import MovieSubMenu from "../components/MovieSubMenu";
import TheLoading from "../components/TheLoading";

function MovieDetail() {
  const { movieId } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_DETAIL, {
    variables: {
      id: movieId,
    },
  });

  const {
    data: { favoriteMovies },
  } = useQuery(GET_FAVORITE_MOVIES);
  const isInFavoriteMovies = favoriteMovies.some(
    (movie) => movie._id === movieId
  );

  const [addMovieToFavoriteMovies] = useMutation(ADD_MOVIE_TO_FAVORITE_MOVIES);

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

  if (loading) return <TheLoading />;
  if (error) return <p>Error...</p>;

  return (
    <Container>
      <MovieSubMenu />
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
          <Button
            className="mt-2"
            variant="success"
            disabled={isInFavoriteMovies ? true : false}
            onClick={() => addMovieToFavoriteMoviesHandle(data.getMovie)}
          >
            Add To Favorites
          </Button>
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
