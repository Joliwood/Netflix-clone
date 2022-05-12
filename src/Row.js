import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import ReactPlayer from 'react-player';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results)
      return request;
    }
    fetchData();
  }, [fetchUrl]);

const handleClick = (movie) => {
  if (trailerUrl) {
    setTrailerUrl("");
    setIsOpen(false);
  } else {
    movieTrailer(movie?.title || movie?.name || movie?.original_name)
    .then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      console.log(urlParams);
      setTrailerUrl(urlParams.get("v"));
      setIsOpen(true);
    })
    .catch((error) => console.log(error));
  }
}

  return (
    <div className="row">
        <h2>{title}</h2>

        <div className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
              alt={movie.name} 
            />
          ))}
        </div>
        {isOpen && trailerUrl && 
          <ReactPlayer 
            playing url={`https://www.youtube.com/watch?v=${trailerUrl}`} 
            height="480px"
            width="98.5%"
          />}
    </div>
    
  );

};

// https://www.youtube.com/watch?v=rpIuoxMSFeQ
// https://youtu.be/rpIuoxMSFeQ
// Donc on voit bien que l'ID, c'est rpIuoxMSFeQ

export default Row;