export function removeById(db, id) {
  return db
    .query(`SELECT removeMovie(${id}) AS id`)
    .then((data) => data.rows[0].id);
}
