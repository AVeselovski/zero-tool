import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    /** Event title */
    title: {
      type: String,
      required: [true, "Event needs a title."],
      trim: true,
      minlength: [3, "Event title must be at least 3 characters long."],
      maxlength: [
        100,
        "Event title cannot exceed the length of 100 characters.",
      ],
    },
    /** Event image */
    image: {
      type: String,
      required: [true, "Event needs an image url."],
      trim: true,
    },
    /** Event address */
    address: {
      type: String,
      required: [true, "Event requires an address."],
      trim: true,
      minlength: [10, "Event address must be at least 10 characters long."],
      maxlength: [
        200,
        "Event address cannot exceed the length of 200 characters.",
      ],
    },
    /** Event description */
    description: {
      type: String,
      required: [true, "Event requires a description."],
      trim: true,
      minlength: [10, "Event description must be at least 10 characters long."],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
