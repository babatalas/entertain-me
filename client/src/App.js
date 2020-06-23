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
  TvSeriesEdit,
  TvSeriesCreate,
  TvSeriesDetail,
  TvSeriesFavorites,
} from "./pages";
import TheNavbar from "./components/TheNavbar";
import './App.css';

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
        <Route path="/tv-series/favorites" component={TvSeriesFavorites} />
        <Route path="/tv-series/edit/:tvSeriesId" component={TvSeriesEdit} />
        <Route path="/tv-series/:tvSeriesId" component={TvSeriesDetail} />
      </Switch>
    </Router>
  );
}

export default App;
