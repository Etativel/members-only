require("dotenv").config({ path: "../.env" });
const pool = require("./pool");
// TRUNCATE category_table RESTART IDENTITY CASCADE;
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (user_id, title, message) VALUES
(1, 'Welcome to the forum', 'This is my first message here. Excited to join the community!'),
(2, 'Question about membership', 'How do I become a premium member?'),
(3, 'Feature Request', 'It would be great to have a dark mode feature.'),
(1, 'Hello World', 'Just testing the messaging feature!'),
(4, 'Admin Announcement', 'Please make sure to read the guidelines before posting.');
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
