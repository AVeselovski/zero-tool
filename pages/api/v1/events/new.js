// /api/v1/events/new
import { MongoClient } from "mongodb";

const dbConnection =
  "mongodb+srv://zero-user-1:6WMbpukv2IRrdbKF@zerocluster.p5ljo.mongodb.net/events?retryWrites=true&w=majority";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(dbConnection);
    const db = client.db();

    const eventsCollection = db.collection("events");
    const result = await eventsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "Event created." });
  }
}

export default handler;
