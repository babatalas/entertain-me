import React from "react";
import { Row, Col, Card, Container, CardDeck } from "react-bootstrap";

function HomeTech() {
  
  return (
    <React.Fragment>
      <Row
        className="text-center"
      >
        <Col className="p-lg-5 mx-auto my-5">
          <h1 className="display-4 font-weigh-normal">The Tech Stack</h1>
          <p className="lead font-weight-normal">
            Here are some tech stack I use to build this project.
          </p>
          <Container>
            <CardDeck className="mt-5">
              <Card>
                <Card.Header>React</Card.Header>
                <Card.Body>
                  <Card.Text>
                    React makes it painless to create interactive UIs. Design
                    simple views for each state in your application, and React
                    will efficiently update and render just the right components
                    when your data changes.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>Apollo Client</Card.Header>
                <Card.Body>
                  <Card.Text>
                    Apollo Client is a complete state management library for
                    JavaScript apps. Simply write a GraphQL query, and Apollo
                    Client will take care of requesting and caching your data,
                    as well as updating your UI.
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header>React Bootstrap</Card.Header>
                <Card.Body>
                  <Card.Text>
                    React-Bootstrap replaces the Bootstrap JavaScript. Each
                    component has been built from scratch as a true React
                    component, without unneeded dependencies like jQuery.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </Container>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default HomeTech;
