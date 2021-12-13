// zero-tool.com/projects/:projectId
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { getProjectData, selectTaskGroups } from "features/tasks/tasksSlice";
import { getAllProjects, setActiveProject } from "features/projects/projectsSlice";

import Container from "components/ui/Container";
import Columns from "components/general/Columns";
import TaskGroup from "components/tasks/TaskGroup";
import NewGroup from "components/tasks/NewGroup";
import Loader from "components/ui/Loader";

export default function ProjectPage() {
  const [isFetching, setIsFetching] = useState(true);

  const router = useRouter();
  const queryId = router.query.projectId;

  const groups = useAppSelector(selectTaskGroups);
  const dispatch = useAppDispatch();

  // get project data on project query change
  useEffect(() => {
    async function _getProjectData(id: string) {
      try {
        setIsFetching(true);
        await dispatch(getProjectData(id)).unwrap();
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      } finally {
        setIsFetching(false);
      }
    }

    if (typeof queryId === "string") {
      _getProjectData(queryId);
      dispatch(setActiveProject(queryId));
    }
  }, [queryId, dispatch]);

  // refetch all available projects
  useEffect(() => {
    async function _getAllProjects() {
      try {
        await dispatch(getAllProjects()).unwrap();
      } catch (error) {
        console.error("Failed to fetch all projects:", error);
      }
    }

    _getAllProjects();
  }, [dispatch]);

  return (
    <Container isFluid isScrollable>
      <Columns>
        {/** TODO: render skeleton loaders while fetching */}
        {groups.map((group) => (
          <Columns.Col key={group._id}>
            <TaskGroup group={group} />
          </Columns.Col>
        ))}

        {/** TODO: do not render while fetching */}
        {!isFetching && (
          <Columns.Col>
            <NewGroup />
          </Columns.Col>
        )}

        {isFetching && <Loader />}
      </Columns>
    </Container>
  );
}
