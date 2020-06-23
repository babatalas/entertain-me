import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_MOVIE, GET_ALL_MOVIES } from "../graphql/queries";

function MovieEditForm(props) {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(undefined);
  const [tags, setTags] = useState([]);

  const history = useHistory();
  const [createMovie] = useMutation(CREATE_MOVIE, {
    update(cache, { data: { createMovie } }) {
      const { movies } = cache.readQuery({ query: GET_ALL_MOVIES });
      cache.writeQuery({
        query: GET_ALL_MOVIES,
        data: {
          movies: [...movies, createMovie],
        },
      });
    },
  });

  const movieTagsHandle = (tags) => {
    const newTags = tags.split(",").map((tag) => tag.trim());
    setTags(newTags);
  };

  const createSubmitHandle = async (e) => {
    e.preventDefault();
    await createMovie({
      variables: {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      },
    });
    history.push(`/movies`);
  };

  return (
    <Form onSubmit={(e) => createSubmitHandle(e)}>
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
