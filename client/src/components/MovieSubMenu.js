import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

function MovieSubMenu() {
  const history = useHistory();

  return (
    <Row className="d-flex flex-row justify-content-between mt-5">
      <Button onClick={() => history.push("/movies/create")}>
        Create new movie
      </Button>
      <Button onClick={() => history.push("/movies/favorites")}>
        View Favorite Movies
      </Button>
    </Row>
  );
}

export default MovieSubMenu;
