const pool = require("./pool");

async function getAllUsername() {
  const { rows } = await pool.query(
    `
        SELECT username FROM users;
    `
  );
  return rows;
}

// INSER USER

async function createUser(params) {
  await pool.query(
    `
            INSERT INTO users (first_name, last_name, username, email, password, is_member, is_admin) VALUES
            ($1, $2, $3, $4, $5, $6, $7)
        `,
    [
      params.first_name,
      params.last_name,
      params.username,
      params.email,
      params.password,
      params.is_member,
      params.is_admin,
    ]
  );
}

module.exports = {
  getAllUsername,
  createUser,
};
