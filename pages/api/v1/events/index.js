// /api/v1/events
import dbConnect from "../../../../lib/dbConnect";
import Event from "../../../../models/event";

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const events = await Event.find({});

        res.status(200).json({ success: true, data: events });
      } catch (error) {
        console.error(error);
        res.status(400).json({
          success: false,
          error: error.errors || error,
          message:
            error.errors?.title?.message || error._message || error.message,
        });
      }
      break;

    case "POST":
      try {
        const event = await Event.create(req.body);

        res.status(201).json({ success: true, data: event });
      } catch (error) {
        console.error(error);
        res.status(400).json({
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
