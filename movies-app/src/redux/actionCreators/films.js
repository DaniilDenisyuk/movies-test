import filmsAT from "../actionTypes/films";
import { API_URL, UPLOAD_FILMS_URI, FILMS_URI } from "../../shared/apiConf";

export const addFilm = (film) => ({
  type: filmsAT.ADD_FILM,
  payload: { film },
});

export const filmsLoading = () => ({
  type: filmsAT.FILMS_LOADING,
});

export const loadingFailed = (message) => ({
  type: filmsAT.LOADING_FAILED,
  payload: { message },
});

export const addMessage = (message, type) => ({
  type: filmsAT.ADD_MESSAGE,
  payload: { message, type },
});

export const addFilms = (films) => ({
  type: filmsAT.ADD_FILMS,
  payload: { films },
});

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

export const fetchFilms = () => (dispatch) => {
  dispatch(filmsLoading());
  const Url = new URL(FILMS_URI, API_URL);
  return fetch(Url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((body) => {
          let error = body.error;
          if (!error) {
            error = "Error " + response.status + ": " + response.statusText;
          }
          throw new Error(error);
        });
      }
    })
    .then((films) => {
      dispatch(addMessage("Films fetched", 2));
      dispatch(addFilms(films));
    })
    .catch((error) => {
      console.log(error);
      dispatch(loadingFailed(error.message, 0));
    });
};

export const postFilm = (film) => (dispatch) => {
  const Url = new URL(FILMS_URI, API_URL);
  return fetch(Url, {
    method: "POST",
    body: JSON.stringify(film),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((body) => {
          let error = body.error;
          if (!error) {
            error = "Error " + response.status + ": " + response.statusText;
          }
          throw new Error(error);
        });
      }
    })
    .then((id) => {
      dispatch(addMessage("Your film successfully posted", 1));
      dispatch(addFilm({ ...film, id }));
    })
    .catch((error) => {
      dispatch(
        addMessage("Your film could not be posted\nError: " + error.message, 0)
      );
    });
};

export const postFilmsFile = (file) => (dispatch) => {
  const Url = new URL(UPLOAD_FILMS_URI, API_URL);
  const formData = new FormData();
  formData.append("file", file);
  return fetch(Url, {
    method: "POST",
    body: formData,
    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        return response.json().then((body) => {
          let error = body.error;
          if (!error) {
            error = "Error " + response.status + ": " + response.statusText;
          }
          throw new Error(error);
        });
      }
    })
    .then(() => {
      dispatch(fetchFilms());
      dispatch(addMessage("Your file succesfully posted", 1));
    })
    .catch((error) => {
      console.log(error);
      dispatch(
        addMessage("Your file could not be posted\nError: " + error.message, 0)
      );
    });
};

export const removeFilm = (id) => (dispatch) => {
  const Url = new URL(`${FILMS_URI}/${id}`, API_URL);
  return fetch(Url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((body) => {
          let error = body.error;
          if (!error) {
            error = "Error " + response.status + ": " + response.statusText;
          }
          throw new Error(error);
        });
      }
    })
    .then(({ message, id }) => {
      dispatch(deleteFilm(id));
      dispatch(addMessage(message, 1));
    })
    .catch((error) => {
      dispatch(
        addMessage("Film could not be deleted\nError: " + error.message, 0)
      );
    });
};
