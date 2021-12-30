const pool = require("../postgresConfig");

module.exports = {
  getNearby: async (nearbyString) => {
    return await pool.query(`
    SELECT * from orgs WHERE zip in ${nearbyString}
`);
  },
};
