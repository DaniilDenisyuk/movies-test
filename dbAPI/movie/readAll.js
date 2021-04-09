export function readAll(db) {
  return db.query("SELECT * FROM allMovies()").then((data) => data.rows);
}
