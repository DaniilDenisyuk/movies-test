import filmsAT from "../actionTypes/films";

export const addFilm = (film) => ({
  type: filmsAT.ADD_FILM,
  payload: { film },
});

export const deleteFilm = (id) => ({
  type: filmsAT.DELETE_FILM,
  payload: { id },
});

export const setSorting = (sortBy) => ({
  type: filmsAT.SET_SORTING,
  payload: { sortBy },
});
