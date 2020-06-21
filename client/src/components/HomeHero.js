import React from "react";
import { Row, Col, Button } from "react-bootstrap";

function HomeHero() {
  const getInTouchHandle = (e) => {
    e.preventDefault();
    window.open("https://github.com/babatalas", "_blank");
  };
  return (
    <Row className="p-3 p-md-5 text-center bg-primary text-white">
      <Col className="p-lg-5 mx-auto my-5">
        <h1 className="display-4 font-weigh-normal">EntertainMe Project</h1>
        <p className="lead font-weight-normal">
          Bootcamp finish line is getting near. But not my journey with this app
          development world.
        </p>
        <Button
          className="mt-5"
          variant="outline-light"
          href="https://github.com/babatalas"
          onClick={getInTouchHandle}
        >
          Get in touch
        </Button>
      </Col>
    </Row>
  );
}

export default HomeHero;
