const pool = require("../postgresConfig");

module.exports = {
  getAll: async (id) => {
    console.log(id);
    return await pool.query(`
    SELECT
      ( SELECT json_agg(event) FROM (
        SELECT * FROM events where events.id = eventFollows.event_id
        ) as event
      ) from eventFollows WHERE user_id='${id}'
`);
  },

  add: async (input) => {},
};
