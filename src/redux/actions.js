// Action types
export const ADD_FILM = "ADD_FILM";

// Action creators
export const addFilm = (item) => ({
  type: ADD_FILM,
  payload: item,
});
