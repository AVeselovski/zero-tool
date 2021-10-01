// /api/v1/projects/:projectId
import dbConnect from "lib/dbConnect";
import Project from "models/project";

async function handler(req, res) {
  const {
    query: { projectId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const project = await Project.findById(projectId);

        if (!project) {
          const error = new Error("Project not found.");

          console.error(error);
          return res.status(404).json({
            success: false,
            error: error.message,
            message: error.message,
          });
        }

        res.status(200).json({ success: true, data: project });
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

    case "PUT":
      try {
        const updatedProject = await Project.findByIdAndUpdate(
          projectId,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!updatedProject) {
          const error = new Error("Project not found.");

          console.error(error);
          return res.status(404).json({
            success: false,
            error: error.message,
            message: error.message,
          });
        }

        res.status(200).json({ success: true, data: updatedProject });
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

    case "DELETE":
      try {
        const deletedProject = await Project.deleteOne({ _id: projectId });

        console.log(deletedProject);

        if (!deletedProject.deletedCount) {
          const error = new Error("Project not found.");

          console.error(error);
          return res.status(404).json({
            success: false,
            error: error.message,
            message: error.message,
          });
        }

        res.status(200).json({ success: true, data: {} });
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
