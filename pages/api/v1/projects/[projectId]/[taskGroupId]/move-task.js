// /api/v1/projects/:projectId/:taskGroupId
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
    query: { projectId, taskGroupId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { nextGroupId, taskId } = req.body;

        // get document
        const project = await Project.findById(projectId);

        // manipulate subdocuments
        const currentGroup = project.taskGroups.id(taskGroupId);
        const task = currentGroup.tasks.id(taskId);
        const duplicateTask = { title: task.title, body: task.body };

        // push to new group
        const nextGroup = project.taskGroups.id(nextGroupId);
        const id = mongoose.Types.ObjectId();
        nextGroup.tasks.push({
          ...duplicateTask,
          _id: id,
          _groupId: nextGroupId,
        });

        // remove from old group
        currentGroup.tasks.id(task._id).remove();

        const movedTask = nextGroup.tasks.find((t) => t._id === id);

        // save document
        try {
          await project.save();
          res.status(201).json({ success: true, data: movedTask });
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
