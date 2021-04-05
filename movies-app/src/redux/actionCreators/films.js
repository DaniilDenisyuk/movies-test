import filmsAT from "../actionTypes/films";
import { APIURL } from "../../shared/apiUrl";

export const addFilm = (film) => ({
  type: filmsAT.ADD_FILM,
  payload: { film },
});

export const fetchFilms = () => (dispatch) => {
  dispatch(filmsLoading());
  return fetch(APIURL + "films")
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((films) => dispatch(addFilms(films)))
    .catch((error) => dispatch(filmsFailed(error.message)));
};

export const filmsLoading = () => ({
  type: filmsAT.FILMS_LOADING,
});

export const filmsFailed = (errmess) => ({
  type: filmsAT.FILMS_FAILED,
  payload: errmess,
});

export const postFilm = (film) => (dispatch) => {
  return fetch(APIURL + "films", {
    method: "POST",
    body: JSON.stringify(film),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((id) => {
      dispatch(addFilm({ ...film, id }));
    })
    .catch((error) => {
      console.log("post film", error.message);
      alert("Your film could not be posted\nError: " + error.message);
    });
};

export const postFilms = (films) => (dispatch) => {
  return fetch(APIURL + "films/upload", {
    method: "POST",
    body: JSON.stringify(films),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addFilms(response)))
    .catch((error) => {
      console.log("post film file", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const addFilms = (films) => ({
  type: filmsAT.ADD_FILMS,
  payload: { films },
});

export const removeFilm = (id) => (dispatch) => {
  return fetch(APIURL + `films/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((remId) => dispatch(deleteFilm(remId)))
    .catch((error) => {
      console.log("delete film", error.message);
      alert("Film could not be deleted\nError: " + error.message);
    });
};

export const deleteFilm = (id) => ({
  type: filmsAT.DELETE_FILM,
  payload: { id },
});

export const setSorting = (sortFunc) => ({
  type: filmsAT.SET_SORTING,
  payload: { sortFunc },
});

export const setOrder = (order) => ({
  type: filmsAT.SET_ORDER,
  payload: { order },
});
