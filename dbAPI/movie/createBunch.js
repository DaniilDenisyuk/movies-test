import { parseRecord } from "../utils/index.js";
// {movie: { title, releaseYear, format, actors}}

export const createBunch = (dbPool, movies) => {
  const bunch = movies.map((movie) => {
    const actors = parseRecord();
    const { data, fields, params } = parseRecord(movie);
  });

  const sql = `BEGIN; ${bunch} COMMIT;`;
  return db.select("movie").then((data) => data.rows);
};

("BEGIN; SELECT * FROM ()");
