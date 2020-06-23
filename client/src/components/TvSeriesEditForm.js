import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TV_SERIES } from "../graphql/queries";

function TvSeriesEditForm(props) {
  const { tvSeries } = props;
  const [title, setTitle] = useState(tvSeries.title);
  const [overview, setOverview] = useState(tvSeries.overview);
  const [poster_path, setPoster_path] = useState(tvSeries.poster_path);
  const [popularity, setPopularity] = useState(tvSeries.popularity);
  const [tags, setTags] = useState(tvSeries.tags);
  const history = useHistory();
  const [updateTvSeries] = useMutation(UPDATE_TV_SERIES);

  const tagsHandle = (tags) => {
    const newTags = tags.split(",").map((tag) => tag.trim());
    setTags(newTags);
  };

  const editSubmitHandle = async (e) => {
    e.preventDefault();
    await updateTvSeries({
      variables: {
        id: tvSeries._id,
        title,
        overview,
        poster_path,
        popularity,
        tags,
      },
    });
    history.push(`/tv-series/${tvSeries._id}`);
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

export default TvSeriesEditForm;
