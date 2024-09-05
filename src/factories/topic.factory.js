const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri);

async function insertRandomData() {
  try {
    await client.connect();
    const database = client.db("depoiq");
    const collection = database.collection("topics");

    const generateRandomText = () => {
      return Math.random().toString(36).substring(2, 15);
    };

    const documents = Array.from({ length: 100 }, (_, index) => ({
      name: generateRandomText(),
    }));

    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

insertRandomData().catch(console.error);
