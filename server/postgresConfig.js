const { Pool } = require("pg");

const credentials = {
  user: "adamjohnson",
  host: "localhost",
  database: "datepicker",
  password: "vicfirthh11",
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = pool;
