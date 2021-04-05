export function remove(db, value, key = "Id") {
  return db
    .delete("movie", `${key} = ${value}`, "Id")
    .then((data) => data.rows[0].id);
}
