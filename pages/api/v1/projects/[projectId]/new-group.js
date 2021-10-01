// /api/v1/projects/:projectId/new-group
import mongoose from "mongoose";

import dbConnect from "lib/dbConnect";
import Project from "models/project";

function handleError(error, res) {
  res.status(500).json({
    success: false,
    error: error.errors || error,
    message: error.errors?.title?.message || error._message || error.message,
  });
  return;
}

async function handler(req, res) {
  const {
    query: { projectId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // get document
        const project = await Project.findById(projectId);

        // manipulate subdocuments
        const id = mongoose.Types.ObjectId();
        project.taskGroups.push({ ...req.body, _id: id });
        const newTaskGroup = project.taskGroups.find((g) => g._id === id);

        // save document
        try {
          await project.save();
          res.status(201).json({ success: true, data: newTaskGroup });
        } catch (error) {
          handleError(error, res);
        }
      } catch (error) {
        handleError(error, res);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default handler;
