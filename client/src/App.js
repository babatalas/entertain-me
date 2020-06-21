import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Movie, MovieDetail, MovieEdit, MovieCreate, TvSeries } from "./pages";
import TheNavbar from "./components/TheNavbar";

function App() {

  return (
    <Router>
      <TheNavbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies" exact component={Movie} />
        <Route path="/movies/create" component={MovieCreate} />
        <Route path="/movies/edit/:movieId" component={MovieEdit} />
        <Route path="/movies/:movieId" component={MovieDetail} />
        <Route path="/tv-series" exact component={TvSeries} />
      </Switch>
    </Router>
  );
}

export default App;
