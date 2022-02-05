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

  const card = { position: Number(body.position), listId: Number(body.listId) };

  switch (method) {
    case "PATCH":
      try {
        const response = await fetch(
          `${ZERO_API_URL}/boards/${boardId}/lists/${listId}/cards/${id}/move`,
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
          /*
           * TODO:
           * 1. Abstract away fetching function
           * 2. Return a list vs lists depending on in-list vs inter-list update? Pointless?
           */

          const updatedListsResponse = await fetch(`${ZERO_API_URL}/boards/${boardId}/lists`, {
            method: "GET",
            headers: {
              Authorization: authorization!,
              "Content-Type": "application/json",
            },
          });
          const updatedListsData = await updatedListsResponse.json();

          if (updatedListsResponse.status === 200) {
            res.status(200).json({ success: true, data: updatedListsData });
          }
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
