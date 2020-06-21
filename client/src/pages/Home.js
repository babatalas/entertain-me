import React from "react";
import { Container } from "react-bootstrap";
import HomeHero from "../components/HomeHero";
import HomeTech from "../components/HomeTech";

function Home() {
  return (
    <Container fluid>
      <HomeHero />
      <HomeTech />
    </Container>
  );
}

export default Home;
