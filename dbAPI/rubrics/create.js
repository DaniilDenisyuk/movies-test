export function create(db, url, name) {
  return db.insert("Rubric", { url, name });
}
