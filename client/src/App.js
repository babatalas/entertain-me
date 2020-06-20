import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import './App.css';

const MOVIE_LIST = gql`
     {
       movies {
         _id
         title
         overview
         poster_path
         popularity
         tags
       }
     }
   `;

function App() {
  const { loading, error, data } = useQuery(MOVIE_LIST)

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, margin: "20px"}}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          data.movies.map(movie => {
          return <p key={movie._id}>{JSON.stringify(movie)}</p>
          })
        )}
      {console.log(data)}
      </main>
    </div>
  );
}

export default App;
