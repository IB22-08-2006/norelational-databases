
const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

async function main() {
  await client.connect();

  const books = client.db("book_db").collection("books");

  await books.deleteMany({});

  // TODO 1 - insertOne with an embedded object
  await books.insertOne({
    title: "Dune",
    author: "Frank Herbert",
    publisher: {
      name: "Chilton Books",
      country: "USA"
    }
  });

  // TODO 2 - insertOne with an array
  await books.insertOne({
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    tags: ["Fantasy", "Adventure", "Classic"]
  });

  // TODO 3 - insertMany
  await books.insertMany([
    {
      title: "The Little Prince",
      author: "Antoine de Saint-Exupéry",
      publisher: {
        name: "Reynal & Hitchcock",
        country: "France"
      },
      tags: ["Fantasy", "Philosophy"]
    },
    {
      title: "Les Misérables",
      author: "Victor Hugo",
      publisher: {
        name: "A. Lacroix",
        country: "France"
      }
    },
    {
      title: "1984",
      author: "George Orwell",
      publisher: {
        name: "Secker & Warburg",
        country: "UK"
      },
      tags: ["Dystopian", "Political Fiction"]
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      tags: ["Romance", "Classic"]
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      publisher: {
        name: "Charles Scribner's Sons",
        country: "USA"
      },
      tags: ["Classic", "Fiction"]
    }
  ]);

  // TODO 4 - find all documents
  const allBooks = await books.find().toArray();

  allBooks.forEach((book) => {
    console.log(book.title);
  });

  // TODO 5 - findOne with dot notation
  const frenchBook = await books.findOne({
    "publisher.country": "France"
  });

  console.log("First French book:", frenchBook.title);

  // TODO 6 - find with a filter
  const frenchBooks = await books.find({
    "publisher.country": "France"
  }).toArray();

  console.log("Number of French books:", frenchBooks.length);

  frenchBooks.forEach((book) => {
    console.log(book.title);
  });

  // TODO 7 - find with $exists
  const taggedBooks = await books.find({
    tags: { $exists: true }
  }).toArray();

  taggedBooks.forEach((book) => {
    console.log(book.title, book.tags);
  });

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
