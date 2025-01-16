require("dotenv").config({ path: "./.env" });
const pool = require("./onlinePool");
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
('charliew', 'Charlie’s Introduction', 'Hi all! I’m Charlie, a newcomer to the forum. Can’t wait to see what everyone is discussing!'),
('johndoe', 'Tech Discussion', 'What do you all think about the latest trends in AI? Exciting times ahead!'),
('janesmith', 'Premium Membership', 'I’ve been considering upgrading to premium membership. Are there any benefits worth it?'),
('bobbrown', 'Question for Developers', 'Can anyone recommend some resources for learning advanced JavaScript? I’ve been stuck on async/await patterns.'),
('alicej', 'Admin Suggestions', 'As an admin, I think the forum could use a better way to categorize discussions. Thoughts on implementing this?'),
('charliew', 'Event Planning', 'Anyone up for a virtual meet-up to discuss coding tips and share some cool projects?'),
('johndoe', 'Favorite Languages', 'I’ve been working a lot with JavaScript lately. What’s everyone’s favorite programming language?'),
('janesmith', 'Forum Feedback', 'I really like the community here, but I think it would be helpful if we had a better search feature.'),
('bobbrown', 'Learning JavaScript', 'Does anyone have a good beginner’s guide to JavaScript? I’m looking to improve my skills.'),
('alicej', 'Forum Improvements', 'I have some ideas for improving the forum layout and user experience. Would love some feedback from fellow admins!'),
('johndoe', 'Forum Bug', 'I’ve noticed that the forum sometimes freezes when I try to post. Anyone else having this issue?'),
('charliew', 'User Guide', 'Could we possibly get an updated user guide for new members? It would be really helpful!');

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
