// Define the initial state
const initialState = {
  filmsList: [],
};

// Define the reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FILM":
      return {
        ...state,
        filmsList: [...state.filmsList, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
