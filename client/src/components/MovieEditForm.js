import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_MOVIE } from "../graphql/queries";

function MovieEditForm(props) {
  const { movie } = props;
  const [title, setTitle] = useState(movie.title);
  const [overview, setOverview] = useState(movie.overview);
  const [poster_path, setPoster_path] = useState(movie.poster_path);
  const [popularity, setPopularity] = useState(movie.popularity);
  const [tags, setTags] = useState(movie.tags);

  const history = useHistory();
  const [updateMovie] = useMutation(UPDATE_MOVIE);

  const movieTagsHandle = (tags) => {
    const newTags = tags.split(",").map((tag) => tag.trim());
    setTags(newTags);
  };

  const editSubmitHandle = async (e) => {
    e.preventDefault();
    await updateMovie({
      variables: {
        id: movie._id,
        title,
        overview,
        poster_path,
        popularity,
        tags,
      },
    });
    history.push(`/movies/${movie._id}`);
  };

  return (
    <Form onSubmit={(e) => editSubmitHandle(e)}>
      <Form.Group>
        <Form.Row>
          <Form.Label column lg={2}>
            Title
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Movie title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Row>
          <Form.Label column lg={2}>
            Overview
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Movie overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Row>
          <Form.Label column lg={2}>
            Poster Url
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Poster Url"
              value={poster_path}
              onChange={(e) => setPoster_path(e.target.value)}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Row>
          <Form.Label column lg={2}>
            Popularity
          </Form.Label>
          <Col>
            <Form.Control
              type="number"
              placeholder="Movie popularity"
              value={popularity}
              onChange={(e) => setPopularity(parseInt(e.target.value))}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Row>
          <Form.Label column lg={2}>
            Tags
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              placeholder="Separate each tag using a coma"
              value={tags.map((tag, i) => (i === 0 ? `${tag}` : ` ${tag}`))}
              onChange={(e) => movieTagsHandle(e.target.value)}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default MovieEditForm;
