import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { GET_TV_SERIES_DETAIL } from "../graphql/queries";
import { Container, Card } from "react-bootstrap";
import TvSeriesEditForm from "../components/TvSeriesEditForm";
import TheLoading from "../components/TheLoading";

function TvSeriesEdit() {
  const { tvSeriesId } = useParams();
  const { loading, error, data } = useQuery(GET_TV_SERIES_DETAIL, {
    variables: {
      id: tvSeriesId,
    },
  });

  if (loading) return <TheLoading />;
  if (error) return <p>Error...</p>;
  
  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>Edit Tv Series Form</Card.Header>
        <Card.Body>
          <TvSeriesEditForm tvSeries={data.getTvSeries} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TvSeriesEdit;
