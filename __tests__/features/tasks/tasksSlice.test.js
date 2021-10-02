import reducer, { setTaskGroups } from "../../../features/tasks/tasksSlice";

const initialState = {
  groups: [],
  status: "idle",
  error: null,
};

describe("Reducers - tasks slice", () => {
  test("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  // test("should handle task groups being added and decorated with 'position'", () => {
  //   const groups = [{ title: "Group A" }, { title: "Group B" }];
  //   const expected = [
  //     { title: "Group A", position: 1 },
  //     { title: "Group B", position: 2 },
  //   ];

  //   expect(reducer(undefined, setTaskGroups(groups))).toEqual({
  //     groups: [...expected],
  //     status: "idle",
  //     error: null,
  //   });
  // });
});
