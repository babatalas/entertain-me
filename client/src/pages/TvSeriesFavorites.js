import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "react-bootstrap";
import { GET_FAVORITE_TV_SERIES } from "../graphql/queries";
import TvSeriesList from "../components/TvSeriesList";
import TvSeriesSubMenu from "../components/TvSeriesSubMenu";
import TheLoading from "../components/TheLoading";

function TvSeriesFavorites() {
  const { loading, error, data } = useQuery(GET_FAVORITE_TV_SERIES);

  if (loading) return <TheLoading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <TvSeriesSubMenu />
      <TvSeriesList tvSeries={data.favoriteTvSeries} />
    </Container>
  );
}

export default TvSeriesFavorites;
