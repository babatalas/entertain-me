import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Movie,
  MovieEdit,
  MovieCreate,
  MovieDetail,
  MovieFavorites,
  TvSeries,
  TvSeriesCreate,
} from "./pages";
import TheNavbar from "./components/TheNavbar";

function App() {
  return (
    <Router>
      <TheNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies" exact component={Movie} />
        <Route path="/movies/create" component={MovieCreate} />
        <Route path="/movies/favorites" component={MovieFavorites} />
        <Route path="/movies/edit/:movieId" component={MovieEdit} />
        <Route path="/movies/:movieId" component={MovieDetail} />
        <Route path="/tv-series" exact component={TvSeries} />
        <Route path="/tv-series/create" component={TvSeriesCreate} />
      </Switch>
    </Router>
  );
}

export default App;
