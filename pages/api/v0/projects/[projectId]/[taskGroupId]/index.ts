// /api/v1/projects/:projectId/:taskGroupId
import mongoose from "mongoose";

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
  const {
    query: { projectId, taskGroupId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // get document
        const project = await Project.findById(projectId);

        // manipulate subdocuments
        const taskGroup = project.taskGroups.id(taskGroupId);
        const id = new mongoose.Types.ObjectId();
        taskGroup.tasks.push({ ...req.body, _id: id, _groupId: taskGroupId });
        const newTask = taskGroup.tasks.find(
          ({ _id }: { _id: mongoose.Types.ObjectId }) => _id === id
        );

        // save document
        try {
          await project.save();
          res.status(201).json({ success: true, data: newTask });
        } catch (error) {
          handleError(error, res);
        }
      } catch (error) {
        handleError(error, res);
      }
      break;

    case "PUT":
      try {
        // get document
        const project = await Project.findById(projectId);

        // manipulate subdocuments
        const taskGroup = project.taskGroups.id(taskGroupId);
        taskGroup.title = req.body.title || taskGroup.title;

        // save document
        try {
          await project.save();
          res.status(201).json({ success: true, data: taskGroup });
        } catch (error) {
          handleError(error, res);
        }
      } catch (error) {
        handleError(error, res);
      }
      break;

    case "DELETE":
      try {
        // get document
        const project = await Project.findById(projectId);

        // manipulate subdocuments
        project.taskGroups.id(taskGroupId).remove();

        // save document
        try {
          await project.save();
          res.status(201).json({ success: true, data: taskGroupId });
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
