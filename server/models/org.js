const pool = require("../postgresConfig");

module.exports = {
  getNearby: async (nearbyString) => {
    return await pool.query(`
    SELECT * from users WHERE type='org'  AND zip in ${nearbyString}
`);
  },
  follow: async (userId, orgId) => {
    return await pool.query(`
    INSERT INTO orgFollows(org_id, user_id) VALUES(${orgId}, ${userId})
`);
  },
  unfollow: async (userId, orgId) => {
    return await pool.query(`
    DELETE from orgFollows WHERE user_id=${userId} AND org_id=${orgId}
`);
  },
};
