require("dotenv").config({ path: "../.env" });
const pool = require("./pool");
// TRUNCATE category_table RESTART IDENTITY CASCADE;
const SQL = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_member BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, username, email, password, is_member, is_admin) VALUES
('John', 'Doe', 'johndoe', 'johndoe@example.com', 'password123', TRUE, FALSE),
('Jane', 'Smith', 'janesmith', 'janesmith@example.com', 'password456', TRUE, FALSE),
('Bob', 'Brown', 'bobbrown', 'bobbrown@example.com', 'password789', FALSE, FALSE),
('Alice', 'Johnson', 'alicej', 'alicej@example.com', 'password000', TRUE, TRUE),
('Charlie', 'White', 'charliew', 'charliew@example.com', 'passwordxyz', FALSE, FALSE);
  `;

async function main() {
  console.log("seeding...");
  const client = await pool.connect();

  try {
    await client.query(SQL);
    console.log("done");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    client.release();
  }
}

main();
