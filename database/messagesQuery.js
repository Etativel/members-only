const pool = require("./pool");

// INSERT MESSAGE

async function insertMessageQuery(params) {
  await pool.query(
    `
        INSERT INTO messages (username, title, message) VALUES
        ($1, 'default', $2)
        `,
    [params.username, params.message]
  );
}

module.exports = {
  insertMessageQuery,
};
