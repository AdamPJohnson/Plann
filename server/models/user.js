const pool = require("../postgresConfig");

module.exports = {
  getOne: (id) => {
    return pool.query(`SELECT * FROM users WHERE id=${id}`);
  },
  getOrgFollows: (id) => {
    return pool.query(
      `SELECT name, username, email, description, zip FROM orgs WHERE id in (SELECT org_id FROM orgFollows where user_id=${id})`
    );
  },
};
