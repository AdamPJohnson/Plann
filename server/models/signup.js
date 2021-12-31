const pool = require("../postgresConfig");

module.exports = {
  signupUser: async (input) => {
    const { username, password, email, zip } = input;

    return await pool.query(
      `INSERT INTO users (username, password, email, zip, type) values ('${username}','${password}','${email}','${zip}', 'user') RETURNING *;`
    );
    ////// THIS NEEDS TO BE FINISHED
  },

  signupOrg: async (input) => {
    const { orgName, username, password, email, zip, description } = input;

    return await pool.query(
      `INSERT INTO users (name, username, password, email, zip, description, type) values ('${orgName}','${username}','${password}','${email}','${zip}','${description}', 'org') RETURNING *;`
    );
    ////// THIS NEEDS TO BE FINISHED
  },
};
