const pool = require("../postgresConfig");

module.exports = {
  signupUser: async (input) => {
    const { username, password, email, zip } = input;
    console.log({ input });
    return await pool.query(
      `INSERT INTO users (username, password, email, zip) values ('${username}','${password}','${email}','${zip}') RETURNING *;`
    );
    ////// THIS NEEDS TO BE FINISHED
  },

  signupOrg: async (input) => {
    const { username, password } = input;
    return await pool.query();
  },
};
