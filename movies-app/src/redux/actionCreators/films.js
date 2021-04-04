import filmsAT from "../actionTypes/films";
import { APIURL } from "../../../../config/apiUrl";

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

export const postFilm = ({ title, year, format, stars }) => (dispatch) => {
  const newFilm = {
    title,
    year,
    format,
    stars,
  };

  return fetch(APIURL + "films", {
    method: "POST",
    body: JSON.stringify(newFilm),
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
    .then((response) => dispatch(addFilm(response)))
    .catch((error) => {
      console.log("post film", error.message);
      alert("Your film could not be posted\nError: " + error.message);
    });
};

export const postFilmsFile = (file) => (dispatch) => {
  return fetch(APIURL + "films/file", {
    method: "POST",
    body: { file },
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
      console.log("post comments", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
};

export const addFilms = (films) => ({
  type: filmsAT.ADD_FILM,
  payload: { films },
});

export const deleteFilm = (id) => ({
  type: filmsAT.DELETE_FILM,
  payload: { id },
});

// export const setSorting = (sortBy) => ({
//   type: filmsAT.SET_SORTING,
//   payload: { sortBy },
// });
