import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import {
  GET_TV_SERIES_DETAIL,
  GET_FAVORITE_TV_SERIES,
  ADD_TV_SERIES_TO_FAVORITE,
} from "../graphql/queries";
import { Container, Card, Figure, Badge, Button } from "react-bootstrap";
import TvSeriesSubMenu from "../components/TvSeriesSubMenu";

function TvSeriesDetail() {
  const { tvSeriesId } = useParams();
  const [addTvSeriesToFavorite] = useMutation(ADD_TV_SERIES_TO_FAVORITE);

  const { loading, error, data } = useQuery(GET_TV_SERIES_DETAIL, {
    variables: {
      id: tvSeriesId,
    },
  });

  const {
    data: { favoriteTvSeries },
  } = useQuery(GET_FAVORITE_TV_SERIES);

  const isInFavoriteTvSeries = favoriteTvSeries.some(
    (series) => series._id === tvSeriesId
  );

  const addTvSeriesToFavoriteHandle = async (tvSeries) => {
    const { _id, title, overview, poster_path, popularity, tags } = tvSeries;
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <Container>
      <TvSeriesSubMenu />
      <Card className="mt-5">
        <Card.Header as="h4" className="text-center">
          Movie Detail
        </Card.Header>
        <Card.Body>
          <Figure>
            <Figure.Image
              src={data.getTvSeries.poster_path}
              alt={data.getTvSeries.title}
            />
            <Figure.Caption>{data.getTvSeries.title}</Figure.Caption>
          </Figure>
          <Card.Title>{data.getTvSeries.title}</Card.Title>
          <Card.Text>{data.getTvSeries.overview}</Card.Text>
          <div>
            {data.getTvSeries.tags.map((tag, index) => (
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
            disabled={isInFavoriteTvSeries ? true : false}
            onClick={() => addTvSeriesToFavoriteHandle(data.getTvSeries)}
          >
            Add To Favorites
          </Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Popularity : {data.getTvSeries.popularity}
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default TvSeriesDetail;
