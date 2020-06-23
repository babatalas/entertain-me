import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CardColumns } from "react-bootstrap";
import { GET_FAVORITE_TV_SERIES } from "../graphql/queries";
import TvSeriesFavoriteListItem from "./TvSeriesFavoriteListItem";
import TvSeriesListItem from "./TvSeriesListItem";

function TvSeriesList(props) {
  const { tvSeries } = props;
  const {
    data: { favoriteTvSeries },
  } = useQuery(GET_FAVORITE_TV_SERIES);

  return (
    <CardColumns className="mt-5">
      {
        tvSeries.map((series) => (series.__typename === "FavoriteTvSeries"
        ? (<TvSeriesFavoriteListItem
            key={series._id}
            series={series}
            isInFavoriteTvSeries={favoriteTvSeries.some(el => el._id === series._id)}
          />)
        : (<TvSeriesListItem
            key={series._id}
            series={series}
            isInFavoriteTvSeries={favoriteTvSeries.some(el => el._id === series._id)}
          />)))
      }
    </CardColumns>
  );
}

export default TvSeriesList;
