export function create(db, film) {
  return db.insert("movie", film, "Id").then((data) => data.rows[0].id);
}
