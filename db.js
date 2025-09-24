const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",       // change if different
  host: "localhost",      // or container IP
  database: "booknook",
  password: "pass",       // change if different
  port: 5432,
});

module.exports = pool;
