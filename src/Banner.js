import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";

const posterUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    const overlay = document.getElementById("overlay");
    const body = document.body;
    overlay.style.display = isOpen ? "block" : "none";
    body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleClick = (movie) => {
    movieTrailer(movie?.title || movie?.name || movie?.original_name)
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${posterUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <div id="overlay"></div>
          <button
            className="banner__button"
            onClick={() => {
              handleClick(movie);
              setIsOpen(true);
            }}
          >
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
      {isOpen && (
        <div className="trailerMainOverview">
          <button
            className="banner__button"
            onClick={() => {
              console.log(isOpen);
              setIsOpen(false);
            }}
          >
            Close the trailer
          </button>
          <ReactPlayer
            playing
            url={`https://www.youtube.com/watch?v=${trailerUrl}`}
            height="480px"
            width="100%"
          />
        </div>
      )}
      {/* )} */}
    </header>
  );
}

export default Banner;
