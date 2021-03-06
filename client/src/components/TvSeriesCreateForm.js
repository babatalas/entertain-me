import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_TV_SERIES, GET_ALL_TV_SERIES } from "../graphql/queries";

function TvSeriesCreateForm(props) {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [popularity, setPopularity] = useState(undefined);
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const [createTvSeries] = useMutation(CREATE_TV_SERIES, {
    update(cache, { data: { createTvSeries } }) {
      const { tvSeries } = cache.readQuery({ query: GET_ALL_TV_SERIES });
      cache.writeQuery({
        query: GET_ALL_TV_SERIES,
        data: {
          tvSeries: [...tvSeries, createTvSeries],
        },
      });
    },
  });

  const tagsHandle = (tags) => {
    const newTags = tags.split(",").map((tag) => tag.trim());
    setTags(newTags);
  };

  const createSubmitHandle = async (e) => {
    e.preventDefault();
    await createTvSeries({
      variables: {
        title,
        overview,
        poster_path,
        popularity,
        tags,
      },
    });
    history.push(`/tv-series`);
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
              placeholder="Tv Series title"
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
              placeholder="Tv Series overview"
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
              placeholder="Tv Series popularity"
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
              onChange={(e) => tagsHandle(e.target.value)}
            />
          </Col>
        </Form.Row>
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default TvSeriesCreateForm;
