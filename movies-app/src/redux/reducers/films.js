import filmsAT from "../actionTypes/films";

const films = (state = [], action) => {
  switch (action.type) {
    case filmsAT.ADD_FILM: {
      const { film } = action.payload;
      return state.concat([film]);
    }
    case filmsAT.ADD_FILMS: {
      const { films } = action.payload;
      return state.concat(films);
    }
    case filmsAT.DELETE_FILM: {
      const { id } = action.payload;
      return state.filter((film) => film.id !== id);
    }
    default:
      return state;
  }
};

export default films;
