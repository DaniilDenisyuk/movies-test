export function readAll(db) {
  return db.select("movie").then((data) => data.rows);
}
