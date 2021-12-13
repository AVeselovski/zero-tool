// /api/v1/projects
import dbConnect from "lib/dbConnect";
import Project from "models/project";

import type { NextApiRequest, NextApiResponse } from "next";

function handleError(error: any, res: NextApiResponse) {
  res.status(500).json({
    success: false,
    error: error.errors || error,
    message: error.errors?.title?.message || error._message || error.message,
  });
  return;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const projects = await Project.find({}).select({ title: 1 });

        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.error(error);
        handleError(error, res);
      }
      break;

    case "POST":
      try {
        const project = await Project.create(req.body);

        res.status(201).json({ success: true, data: project });
      } catch (error) {
        console.error(error);
        handleError(error, res);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default handler;
