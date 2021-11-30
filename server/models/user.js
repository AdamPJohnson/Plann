const pool = require("../postgresConfig");

module.exports = {
  getOne: (id) => {
    return pool.query(`SELECT * FROM users WHERE id=${id}`);
  },
};
