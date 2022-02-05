// /api/v1/projects/:projectId/lists/:listId/cards/:cardId
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
    query: { projectId: boardId, listId, cardId: id },
    body,
  } = req;

  if (!req.headers.authorization) {
    handleError(401, "Authorization header missing!", res);
  }

  const card = body;

  switch (method) {
    case "PATCH":
      try {
        const response = await fetch(
          `${ZERO_API_URL}/boards/${boardId}/lists/${listId}/cards/${id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: authorization!,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(card),
          }
        );

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

    case "DELETE":
      try {
        const response = await fetch(
          `${ZERO_API_URL}/boards/${boardId}/lists/${listId}/cards/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: authorization!,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          res
            .status(200)
            .json({ success: true, data: { listId: Number(listId), cardId: Number(id) } });
        } else {
          handleError(response.status, "Something went wrong!", res);
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
