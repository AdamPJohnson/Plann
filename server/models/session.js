const pool = require("../postgresConfig");

module.exports = {
  insert: (hash) => {
    return pool.query(`INSERT INTO sessions (hash) VALUES('${hash}')`);
  },
  check: (hash) => {
    return pool.query(`SELECT * FROM sessions where hash='${hash}'`);
  },
  addUser: (hash, id) => {
    return pool.query(`UPDATE sessions SET user_id=${id} WHERE hash='${hash}'`);
  },
  removeUser: (hash, id) => {
    return pool.query(`
    `);
  },
};
