require("dotenv").config({ path: "../.env" });
const pool = require("./pool");
// TRUNCATE category_table RESTART IDENTITY CASCADE;
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, title, message) VALUES
('JohnDoe', 'Welcome to the forum', 'This is my first message here. Excited to join the community!'),
('JaneSmith', 'Question about membership', 'How do I become a premium member?'),
('BobBrown', 'Feature Request', 'It would be great to have a dark mode feature.'),
('JohnDoe', 'Hello World', 'Just testing the messaging feature!'),
('AdminUser', 'Admin Announcement', 'Please make sure to read the guidelines before posting.');
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
