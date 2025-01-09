const pool = require("./pool");

async function getEmail(email) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users WHERE email = $1
    `,
    [email]
  );
  return rows;
}

async function getUsername(username) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users WHERE username = $1
    `,
    [username]
  );

  return rows;
}

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
  getUsername,
  getEmail,
  createUser,
};
