// /api/v1/test
import dbConnect from "../../../lib/dbConnect";

dbConnect();

async function handler(req, res) {
  res.json({ foo: "bar" });
}

export default handler;
