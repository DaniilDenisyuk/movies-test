export const getFilms = (store) => store.films.list;

export const sortFilms = (store, sortFunc, order) => {
  const allFilms = getFilms(store);
  if (sortFunc) {
    return [...allFilms.sort(sortFunc(order))];
  }
  return allFilms;
};
