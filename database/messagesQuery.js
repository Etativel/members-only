const pool = require("./pool");

// GET MESSAGE

async function getAllMessage() {
  const { rows } = await pool.query(`
            SELECT * FROM messages
        
        `);

  return rows;
}

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
  getAllMessage,
};
