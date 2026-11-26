
const mongoose = require("mongoose");
const User = require("./models/user");
const Post = require("./models/post");

// Load seed data from the JSON files in data/
const usersData = require("./data/users.json");
const postsData = require("./data/posts.json");

const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/blog_db";

async function main() {
  await mongoose.connect(URI);

  // Delete existing documents
  await User.deleteMany({});
  await Post.deleteMany({});

  // Insert users
  const users = await User.insertMany(usersData);

  // Insert posts
  const posts = await Post.insertMany(postsData);

  // Log inserted counts
  console.log(`Inserted ${users.length} users.`);
  console.log(`Inserted ${posts.length} posts.`);

  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
