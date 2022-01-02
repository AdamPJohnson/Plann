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
  follow: async (id, userId) => {
    return await pool.query(`
    INSERT INTO eventFollows(event_id, user_id) VALUES(${id}, ${userId})
  `);
  },
  unfollow: async (id, userId) => {
    return await pool.query(`
    DELETE from eventFollows WHERE user_id=${userId} AND event_id=${id}
`);
  },
  getNearby: async (nearbyString) => {
    return await pool.query(`
    SELECT * from events WHERE zip in ${nearbyString}
`);
  },

  add: async (body) => {
    let { eventName, description, id, zip, eventType, date } = body;
    description = description.replace(/'/g, "''");
    eventName = eventName.replace(/'/g, "''");

    date = new Date(date).getTime();
    return await pool.query(`
     INSERT INTO events (name, date, description, org_id, zip, type) VALUES('${eventName}', ${date}, '${description}','${id}', ${zip}, '${eventType}')
    `);
  },
};
