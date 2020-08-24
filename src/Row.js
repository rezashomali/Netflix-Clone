import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((item) => (
          <img
            key={item.id}
            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
            src={
              base_url + (isLargeRow ? item.poster_path : item.backdrop_path)
            }
            alt={item.original_title}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;