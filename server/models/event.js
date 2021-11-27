const pool = require("../postgresConfig");

module.exports = {
  getAllUserEvents: async (id) => {
    return await pool.query(`
    SELECT
      ( SELECT json_agg(event) FROM (
        SELECT * FROM events where events.id = eventFollows.event_id
        ) as event
      ) from eventFollows WHERE user_id='${id}'
`);
  },

  getAllOrgEvents: async (id) => {
    return await pool.query(`
    SELECT * from events WHERE org_id='${id}'
`);
  },
  delete: async (id, orgId) => {
    return await pool.query(`
    DELETE from events WHERE org_id='${orgId}' AND id='${id}'
`);
  },

  add: async (body) => {
    console.log(body);
    const { eventName, description, id } = body;
    let { date } = body;
    date = new Date(date).getTime() / 1000;
    return await pool.query(`
     INSERT INTO events (name, date, description, org_id) VALUES('${eventName}', ${date}, '${description}','${id}')
    `);
  },
};
