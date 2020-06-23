import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { DELETE_TV_SERIES, ADD_TV_SERIES_TO_FAVORITE, GET_ALL_TV_SERIES } from "../graphql/queries";

function TvSeriesListItem(props) {
  const { series, isInFavoriteTvSeries } = props;

  const history = useHistory();
  const [addTvSeriesToFavorite] = useMutation(ADD_TV_SERIES_TO_FAVORITE);

  const [deleteTvSeries] = useMutation(DELETE_TV_SERIES, {
    update(cache, { data: { deleteTvSeries }}) {
      const { tvSeries } = cache.readQuery({ query: GET_ALL_TV_SERIES })
      cache.writeQuery({
        query: GET_ALL_TV_SERIES,
        data: {
          tvSeries: tvSeries.filter((series) => series._id !== deleteTvSeries._id),
        },
      });
    }
  });

  const seeTvSeriesDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/tv-series/${id}`);
  };

  const editTvSeriesDetailHandle = (e, id) => {
    e.preventDefault();
    history.push(`/tv-series/edit/${id}`);
  };

  const addTvSeriesToFavoriteHandle = async () => {
    const { _id, title, overview, poster_path, popularity, tags } = series;
    await addTvSeriesToFavorite({
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

  const deleteTvSeriesHandle = async () => {
    await deleteTvSeries({
      variables: {
        id: series._id,
      },
    });
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
            <Button
              className="mt-2"
              variant="success"
              disabled={isInFavoriteTvSeries ? true : false}
              onClick={addTvSeriesToFavoriteHandle}
            >
              Add To Favorites
            </Button>
          </div>
          <div className="d-flex flex-column justify-content-between">
            <Button
              className="mt-2"
              variant="info"
              href={`/tv-series/edit/${series._id}`}
              onClick={(e) => editTvSeriesDetailHandle(e, series._id)}
            >
              Edit
            </Button>
            <Button
              className="mt-2"
              variant="danger"
              onClick={deleteTvSeriesHandle}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TvSeriesListItem;
