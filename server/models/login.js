const pool = require("../postgresConfig");

module.exports = {
  loginUser: async (input) => {
    const { username, password } = input;
    return await pool.query(
      `SELECT * from users WHERE username='${username.toLowerCase()}' AND password='${password}'`
    );
  },

  loginOrg: () => {},
};
