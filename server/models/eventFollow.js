const pool = require("../postgresConfig");

module.exports = {
  delete: async (id, userId) => {
    return await pool.query(`
    DELETE from eventFollows WHERE user_id=${userId} AND event_id=${id}
`);
  },

  add: async (input) => {},
};
