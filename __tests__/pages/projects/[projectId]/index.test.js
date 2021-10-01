import React from "react";
import { useRouter } from "next/router";
import { rest } from "msw";
import { setupServer } from "msw/node";

// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from "../../../../testSetup";
import ProjectPage from "@pages/projects/[projectId]/index.js";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get("/api/user", (req, res, ctx) => {
    return res(ctx.json("John Smith"), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

jest.mock("next/dist/client/router", () => require("next-router-mock"));

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test("Just trying to figure out RTK & RTK Query testing...", async () => {
  render(<ProjectPage />);
});
