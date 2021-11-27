const pool = require("../postgresConfig");

module.exports = {
  signupUser: async (input) => {
    const { username, password, email, zip } = input;

    return await pool.query(
      `INSERT INTO users (username, password, email, zip) values ('${username}','${password}','${email}','${zip}') RETURNING *;`
    );
    ////// THIS NEEDS TO BE FINISHED
  },

  signupOrg: async (input) => {
    const { orgName, username, password, email, zip, description } = input;

    return await pool.query(
      `INSERT INTO orgs (name, username, password, email, zip, description) values ('${orgName}','${username}','${password}','${email}','${zip}','${description}') RETURNING *;`
    );
    ////// THIS NEEDS TO BE FINISHED
  },
};
