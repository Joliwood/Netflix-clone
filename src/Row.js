import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { addFilm } from "./redux/actions";
import { connect } from "react-redux";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow, addFilm, filmsList }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setIsOpen(false);
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          setIsOpen(true);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleAddFilm = (movie) => {
    const isFilmInList = filmsList.some((item) => item === movie.title);

    if (!isFilmInList) {
      addFilm(movie.title);
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`row__poster ${
              isLargeRow && "row__posterLarge"
            } row__posterContainer`}
          >
            <img
              onClick={() => handleClick(movie)}
              className={`row__posterImg ${
                isLargeRow && "row__posterImgLarge"
              }`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
            <button
              onClick={() => handleAddFilm(movie)}
              className="row__addList"
            >
              <img
                src="https://www.svgrepo.com/show/366540/add.svg"
                alt="add to the list svg"
              />
            </button>
          </div>
        ))}
      </div>
      {isOpen && trailerUrl && (
        <ReactPlayer
          playing
          url={`https://www.youtube.com/watch?v=${trailerUrl}`}
          height="480px"
          width="98.5%"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filmsList: state.filmsList,
});

const mapDispatchToProps = {
  addFilm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Row);
