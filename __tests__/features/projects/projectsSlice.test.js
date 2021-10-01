import reducer, {
  setProjects,
  setActiveProject,
} from "../../../features/projects/projectsSlice";

const initialState = {
  projects: [],
  activeProject: "",
};

describe("Reducers - projects slice", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test("should handle projects being added", () => {
    const projects = [{ title: "Project A" }];

    expect(reducer(undefined, setProjects(projects))).toEqual({
      projects: [...projects],
      activeProject: "",
    });
  });

  test("should handle setting active project", () => {
    const project = "123456789";

    expect(reducer(undefined, setActiveProject(project))).toEqual({
      projects: [],
      activeProject: project,
    });
  });
});
