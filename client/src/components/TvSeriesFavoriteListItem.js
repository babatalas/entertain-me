import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { REMOVE_TV_SERIES_FROM_FAVORITE } from "../graphql/queries";

function TvSeriesFavoriteListItem(props) {
  const { series } = props;
  const history = useHistory();

  const [removeTvSeriesFromFavorite] = useMutation(
    REMOVE_TV_SERIES_FROM_FAVORITE,
    {
      variables: {
        id: series._id,
      },
    }
  );

  const seeTvSeriesDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/tv-series/${id}`);
  };

  return (
    <Card>
      <Card.Img variant="top" src={series.poster_path} />
      <Card.Body>
        <Card.Title>{series.title}</Card.Title>
        <Card.Text>Popularity : {series.popularity}</Card.Text>
        <div className="d-flex flex-wrap justify-content-between">
          <div className="d-flex flex-column justify-content-between">
            <Button
              className="mt-2"
              variant="primary"
              href={`/tv-series/${series._id}`}
              onClick={(e) => seeTvSeriesDetailHandle(e, series._id)}
            >
              See Detail
            </Button>
          </div>
          <div className="d-flex flex-column justify-content-between">
            <Button
              className="mt-2"
              variant="danger"
              onClick={removeTvSeriesFromFavorite}
            >
              Remove From Favorites
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TvSeriesFavoriteListItem;
