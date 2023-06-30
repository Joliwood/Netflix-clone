import React, { useState } from "react";
import axios from "../axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import ReactPlayer from "react-player";
import { addFilm } from "../redux/actions";
import { connect } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const base_url_image = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow, addFilm, filmsList }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { error, isError } = useQuery({
    queryKey: ["movies", fetchUrl, title],
    queryFn: async ({ signal }) => {
      const { data } = await axios.get(fetchUrl, signal);
      setMovies(data.results);

      return data;
    },
  });

  if (isError | error) console.log("error", error);

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
    console.log(movies);
    if (!isFilmInList) {
      addFilm(movie.title);
    }
  };

  return (
    <div className="row" data-testid="rowComponent">
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
              src={`${base_url_image}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
            <button
              onClick={() => handleAddFilm(movie)}
              data-testid="addFilm"
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
