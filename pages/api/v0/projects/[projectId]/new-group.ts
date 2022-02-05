// /api/v1/projects/:projectId/new-group
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.json({ foo: "bar" });
}

export default handler;

// import mongoose from "mongoose";

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
//     query: { projectId },
//     method,
//   } = req;

//   await dbConnect();

//   switch (method) {
//     case "POST":
//       try {
//         // get document
//         const project = await Project.findById(projectId);

//         // manipulate subdocuments
//         const id = new mongoose.Types.ObjectId();
//         project.taskGroups.push({ ...req.body, _id: id });
//         const newTaskGroup = project.taskGroups.find(
//           ({ _id }: { _id: mongoose.Types.ObjectId }) => _id === id
//         );

//         // save document
//         try {
//           await project.save();
//           res.status(201).json({ success: true, data: newTaskGroup });
//         } catch (error) {
//           handleError(error, res);
//         }
//       } catch (error) {
//         handleError(error, res);
//       }
//       break;

//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// }

// export default handler;
