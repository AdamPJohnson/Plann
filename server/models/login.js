const pool = require("../postgresConfig");

module.exports = {
  loginUser: async (input) => {
    const { username } = input;
    return await pool.query(
      `SELECT * from users WHERE type='user' AND username='${username.toLowerCase()}'`
    );
  },

  loginOrg: async (input) => {
    const { username } = input;
    return await pool.query(
      `SELECT * from users WHERE type='org' AND username='${username.toLowerCase()}'`
    );
  },
};
