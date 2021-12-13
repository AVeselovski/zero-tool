// /api/v1/test
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({ foo: "bar" });
}

export default handler;
