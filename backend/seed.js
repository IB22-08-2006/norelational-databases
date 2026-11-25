
const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: Insert a user with an embedded address object.
  await users.insertOne({
    name: "Alice",
    email: "alice@example.com",
    address: {
      city: "Paris",
      country: "France"
    }
  });

  // TODO 2: Insert a user with a skills array containing at least 3 items.
  await users.insertOne({
    name: "Bob",
    email: "bob@example.com",
    skills: ["JavaScript", "Python", "MongoDB"]
  });

  // TODO 3: Insert at least 5 users in a single call.
  await users.insertMany([
    {
      name: "Claire",
      email: "claire@example.com",
      address: { city: "Lyon", country: "France" },
      skills: ["Java", "SQL"]
    },
    {
      name: "David",
      email: "david@example.com",
      address: { city: "London", country: "UK" },
      skills: ["Python"]
    },
    {
      name: "Emma",
      email: "emma@example.com",
      address: { city: "Bordeaux", country: "France" }
    },
    {
      name: "Frank",
      email: "frank@example.com",
      address: { city: "Berlin", country: "Germany" }
    },
    {
      name: "Grace",
      email: "grace@example.com",
      skills: ["C++", "React", "Node.js"]
    }
  ]);

  // TODO 4: Retrieve all documents and log each user's name.
  const allUsers = await users.find().toArray();

  allUsers.forEach(user => {
    console.log(user.name);
  });

  // TODO 5: Find the user whose address.city is "Paris".
  const parisUser = await users.findOne({
    "address.city": "Paris"
  });

  console.log("User from Paris:", parisUser);

  // TODO 6: Find all users whose address.country is "France".
  const frenchUsers = await users.find({
    "address.country": "France"
  }).toArray();

  console.log("Users from France:");
  frenchUsers.forEach(user => {
    console.log(user.name);
  });

  // TODO 7: Find all users who have a skills field.
  const usersWithSkills = await users.find({
    skills: { $exists: true }
  }).toArray();

  console.log("Users with skills:");
  usersWithSkills.forEach(user => {
    console.log(user.name);
  });

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
