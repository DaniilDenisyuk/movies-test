import pkg from "pg";
const { Pool } = pkg;

function Database(config) {
  this.pool = new Pool(config);
  this.query = function (sql, values) {
    return this.pool.query(sql, values);
  };
  this.insert = function (table, record) {
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
    const sql = `INSERT INTO ${table} (${fields}) VALUES (${params})`;
    return this.query(sql, data);
  };

  this.select = async function (table, fields = ["*"], condition = null) {
    const keys = fields.join(", ");
    const sql = `SELECT ${keys} FROM ${table}`;
    let whereClause = "";
    let args = [];
    let i = 1;
    if (condition) {
      whereClause = " WHERE " + condition;
    }
    const res = await this.query(sql + whereClause, args);
    return res.rows;
  };
}

export default Database;
