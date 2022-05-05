import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";

function Row({ title, fetchUrl, isLargeRow }) {
  const[movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results)
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVar: {
      
      autoplay: 1,
    },
  };

  return (
    <div className="row">
        <h2>{title}</h2>

        <div className="row__posters">
          {movies.map(movie => (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
              alt={movie.name} 
            />
          ))}
          {/* <YouTube videoId="https://www.youtube.com/watch?v=rpIuoxMSFeQ" opts={opts} /> */}
        </div>
    </div>
  )
};

export default Row;