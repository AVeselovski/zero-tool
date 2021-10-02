import React from "react";
import mockRouter from "next-router-mock";

import { render, screen, waitFor } from "../../../../testSetup";
import projectsResponse from "@mocks/fixtures/projects";
import projectResponse from "@mocks/fixtures/project";

import ProjectPage from "@pages/projects/[projectId]/index.js";

describe("Project page:", () => {
  beforeEach(() => {
    mockRouter.push({
      pathname: "/projects/[projectId]",
      query: { projectId: "123" },
    });

    // mock root element, needed for certain components
    document.body.innerHTML = `<div id="__next"></div>`;

    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(projectResponse));
    fetch.mockResponseOnce(JSON.stringify(projectsResponse));
  });

  it("Should fetch and receive projects data", async () => {
    await waitFor(() => render(<ProjectPage />));

    expect(screen.getByText(/Group A/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /\+ Add column/i,
      })
    ).toBeInTheDocument();
  });
});
