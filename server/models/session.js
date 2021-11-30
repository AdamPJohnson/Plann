const pool = require("../postgresConfig");

module.exports = {
  loginUser: async (input) => {
    return await pool.query(`
    `);
  },

  loginOrg: async (input) => {
    const { username } = input;
    return await pool.query(
      `SELECT * from orgs WHERE username='${username.toLowerCase()}'`
    );
  },
};
