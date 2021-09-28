// /api/v1/projects
import dbConnect from "../../../../lib/dbConnect";
import Project from "../../../../models/project";

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const projects = await Project.find({}).select({ title: 1 });

        res.status(200).json({ success: true, data: projects });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error: error.errors || error,
          message:
            error.errors?.title?.message || error._message || error.message,
        });
      }
      break;

    case "POST":
      try {
        const project = await Project.create(req.body);

        res.status(201).json({ success: true, data: project });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          error: error.errors || error,
          message:
            error.errors?.title?.message || error._message || error.message,
        });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default handler;
