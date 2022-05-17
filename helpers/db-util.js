
const { MongoClient } = require("mongodb");

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://agnieve0513:Jkxjry8kV8sYaVw4@cluster0.h7lt8.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}


export async function getAllDocuments(client, collection, sort)
{
    const db = client.db();
    const documents = await db
      .collection(collection)
      .find()
      .sort(sort)
      .toArray();

      return documents;
}