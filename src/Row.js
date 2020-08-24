import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUlr] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUlr("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.original_title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams.get("v"));
          setTrailerUlr(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((item) => (
          <img
            onClick={() => handleClick(item)}
            key={item.id}
            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
            src={
              base_url + (isLargeRow ? item.poster_path : item.backdrop_path)
            }
            alt={item.original_title}
          />
        ))}
      </div>

      {trailerUrl && <YouTube videoUrl={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
