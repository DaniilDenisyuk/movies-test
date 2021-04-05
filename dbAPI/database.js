import pkg from "pg";
const { Pool } = pkg;

function Database(config) {
  this.pool = new Pool(config);
  this.query = function (sql, values) {
    return this.pool.query(sql, values);
  };
  this.insert = function (table, record, returning) {
    const keys = Object.keys(record);
    const nums = new Array(keys.length);
    const data = new Array(keys.length);
    let i = 0;
    for (const key of keys) {
      data[i] = record[key];
      nums[i] = `$${++i}`;
    }
    const fields = keys.join(", ");
    const params = nums.join(", ");
    const sql = `INSERT INTO ${table} (${fields}) VALUES (${params}) ${
      returning ? "RETURNING " + returning : ""
    }`;
    return this.query(sql, data);
  };

  this.select = function (table, fields = ["*"], condition = null) {
    const keys = fields.join(", ");
    const sql = `SELECT ${keys} FROM ${table}`;
    let whereClause = "";
    if (condition) {
      whereClause = " WHERE " + condition;
    }
    return this.query(sql, whereClause);
  };

  this.delete = function (table, condition, returning) {
    const sql = `DELETE FROM ${table} WHERE ${condition} ${
      returning ? "RETURNING " + returning : ""
    }`;
    return this.query(sql);
  };
}

export default Database;
