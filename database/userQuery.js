const pool = require("./pool");

async function getAllUsername() {
  const { rows } = await pool.query(
    `
                SELECT username FROM users;
        `
  );
  return rows;
}

module.exports = {
  getAllUsername,
};
