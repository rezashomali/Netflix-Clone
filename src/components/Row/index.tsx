import React, { useState, useEffect } from "react";
import axios from "../../Api/axios";
import YouTube from "react-youtube";
import "./Row.css";
// import movieTrailer from "movie-trailer";
const movieTrailer = require("movie-trailer");

const base_url: string = "https://image.tmdb.org/t/p/original/";

interface Props {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}

interface MovieType {
  backdrop_path: string;
  name?: string;
  title?: string;
  original_name?: string;
  overview: string;
  map: any;
}

const YouTubeOption = {
  height: "390",
  width: "100%",
};

const Row: React.FC<Props> = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState<MovieType>();
  const [trailerUrl, setTrailerUlr] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // console.log(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie: {
    name?: string;
    original_name?: string;
    original_title?: string;
  }) => {
    if (trailerUrl) {
      setTrailerUlr("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.original_title)
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUlr(urlParams.get("v"));
        })
        .catch((error: string) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies?.map(
          (item: {
            id: number;
            original_title: string;
            poster_path: string;
            backdrop_path: string;
          }) => (
            <img
              onClick={() => handleClick(item)}
              key={item.id}
              className={`row__poster ${isLargeRow && "row_posterLarge"}`}
              src={
                base_url + (isLargeRow ? item.poster_path : item.backdrop_path)
              }
              alt={item.original_title}
            />
          )
        )}
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={YouTubeOption} />}
    </div>
  );
};

export default Row;
