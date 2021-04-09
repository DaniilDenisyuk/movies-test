import filmsAT from "../actionTypes/films";
const initialState = {
  isLoading: true,
  message: {
    type: null,
    text: "",
  },
  list: [],
  sorting: null,
  order: "ASC",
};

const films = (state = initialState, action) => {
  switch (action.type) {
    case filmsAT.ADD_FILM: {
      const { film } = action.payload;
      return {
        ...state,
        isLoading: false,
        list: state.list.concat(film),
      };
    }
    case filmsAT.ADD_FILMS: {
      const { films } = action.payload;
      return {
        ...state,
        isLoading: false,
        list: films,
      };
    }
    case filmsAT.DELETE_FILM: {
      const { id } = action.payload;
      return {
        ...state,
        list: state.list.filter((film) => film.id !== id),
      };
    }
    case filmsAT.SET_SORTING: {
      const { sortFunc } = action.payload;
      return {
        ...state,
        sorting: sortFunc,
      };
    }
    case filmsAT.ADD_MESSAGE: {
      const { message, type } = action.payload;
      return {
        ...state,
        message: { text: message, type },
      };
    }
    case filmsAT.LOADING_FAILED: {
      const { message } = action.payload;
      return {
        ...state,
        message: { text: message, type: 0 },
        isLoading: false,
      };
    }
    case filmsAT.FILMS_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case filmsAT.SET_ORDER: {
      const { order } = action.payload;
      return {
        ...state,
        order: order,
      };
    }
    default:
      return state;
  }
};

export default films;
