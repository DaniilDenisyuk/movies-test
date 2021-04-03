export function readByKey(db, value, key = "Id") {
  return db.select("Rubric", ["*"], `${key} = ${value}`);
}
