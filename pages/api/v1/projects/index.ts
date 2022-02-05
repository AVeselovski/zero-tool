// /api/v1/projects
import { ZERO_API_URL } from "utils/constants";

import type { NextApiRequest, NextApiResponse } from "next";

function handleError(status: number = 500, error: any, res: NextApiResponse) {
  console.error(error);

  res.status(status).json({
    success: false,
    error: error.errors?.[0] || error,
    message:
      error.errors?.[0] || error.errors?.title?.message || error._message || error.message || error,
  });

  return;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    headers: { authorization },
    method,
  } = req;

  if (!req.headers.authorization) {
    handleError(401, "Authorization header missing!", res);
  }

  switch (method) {
    case "GET":
      try {
        const response = await fetch(`${ZERO_API_URL}/boards`, {
          method: "GET",
          headers: {
            Authorization: authorization!,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          res.status(200).json({ success: true, data });
        } else {
          handleError(response.status, data, res);
        }
      } catch (error) {
        handleError(500, error, res);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default handler;
