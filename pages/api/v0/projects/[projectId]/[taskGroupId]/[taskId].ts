// /api/v1/projects/:projectId/:taskGroupId/:taskId
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({ foo: "bar" });
}

export default handler;

// import dbConnect from "lib/dbConnect";
// import Project from "models/project";

// import type { NextApiRequest, NextApiResponse } from "next";

// function handleError(error: any, res: NextApiResponse) {
//   res.status(500).json({
//     success: false,
//     error: error.errors || error,
//     message: error.errors?.title?.message || error._message || error.message,
//   });
//   return;
// }

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const {
//     query: { projectId, taskGroupId, taskId },
//     method,
//   } = req;

//   await dbConnect();

//   switch (method) {
//     case "PUT":
//       try {
//         // get document
//         const project = await Project.findById(projectId);

//         // manipulate subdocuments
//         const taskGroup = project.taskGroups.id(taskGroupId);
//         const task = taskGroup.tasks.id(taskId);
//         task.title = req.body.title || task.title;
//         task.body = req.body.body || task.body;
//         task._groupId = taskGroupId;

//         // save document
//         try {
//           await project.save();
//           res.status(200).json({ success: true, data: task });
//         } catch (error) {
//           handleError(error, res);
//         }
//       } catch (error) {
//         console.error(error);
//         handleError(error, res);
//       }
//       break;

//     case "DELETE":
//       try {
//         // get document
//         const project = await Project.findById(projectId);

//         // manipulate subdocuments
//         const taskGroup = project.taskGroups.id(taskGroupId);
//         taskGroup.tasks.id(taskId).remove();

//         // save document
//         try {
//           await project.save();
//           res.status(200).json({ success: true, data: taskId });
//         } catch (error) {
//           handleError(error, res);
//         }
//       } catch (error) {
//         console.error(error);
//         handleError(error, res);
//       }
//       break;

//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }

// export default handler;
