import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    /** Task title */
    title: {
      type: String,
      required: [true, "Task needs a title"],
      trim: true,
      maxlength: [
        120,
        "Task title cannot exceed the length of 120 characters.",
      ],
    },

    /** Task body, markdown content */
    body: {
      type: String,
      required: [true, "Task needs a body"],
      trim: true,
    },

    _groupId: {
      type: String,
    },
  },

  { timestamps: true }
);

const taskGroupSchema = new mongoose.Schema(
  {
    /** Task group title */
    title: {
      type: String,
      required: [true, "Task group needs a title"],
      trim: true,
      maxlength: [
        60,
        "Task group title cannot exceed the length of 60 characters.",
      ],
    },

    /** Tasks (subdocument) */
    tasks: [taskSchema],
  },

  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    /** Project title */
    title: {
      type: String,
      required: [true, "Project needs a title."],
      trim: true,
      minlength: [3, "Project title must be at least 3 characters long."],
      maxlength: [
        60,
        "Project title cannot exceed the length of 60 characters.",
      ],
    },

    /** Project version (for future implementation) */
    version: {
      type: Number,
      default: 1,
    },

    /** Task groups (subdocument) */
    taskGroups: [taskGroupSchema],
  },

  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
