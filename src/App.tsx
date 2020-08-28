import React from "react";
import Row from "./components/Row";
import Banner from "./components/Banner";
import "./App.css";
import requests from "./Api/requests";
import Nav from "./components/Nav";

const App: React.FC = () => {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="Netflix originals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trendings" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romace Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default App;
