import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

function TvSeriesSubMenu() {
  const history = useHistory();

  return (
    <Row className="d-flex flex-row justify-content-between mt-5">
      <Button onClick={() => history.push("/tv-series/create")}>
        Create new tv-series
      </Button>
      <Button onClick={() => history.push("/tv-series/favorites")}>
        View Favorite Tv-Series
      </Button>
    </Row>
  );
}

export default TvSeriesSubMenu;
