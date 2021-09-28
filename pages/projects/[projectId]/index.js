// zero-tool.com/projects/:projectId
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetAllProjectsQuery,
  // useGetProjectByIdQuery,
  useLazyGetProjectByIdQuery,
} from "../../../services/zeroApi";
import {
  setProjects,
  setActiveProject,
} from "../../../features/projects/projectsSlice";
import {
  setTaskGroups,
  selectTaskGroups,
} from "../../../features/tasks/tasksSlice";

import TaskGroup from "../../../components/tasks/TaskGroup";
import NewGroup from "../../../components/tasks/NewGroup";
// import Loader from "../../../components/ui/Loader";

export default function ProjectPage(props) {
  const router = useRouter();
  const queryId = router.query.projectId;

  const groups = useSelector(selectTaskGroups);
  const dispatch = useDispatch();

  const allProjects = useGetAllProjectsQuery();
  const [getProjectById, project] = useLazyGetProjectByIdQuery();

  // set all available projects listing
  useEffect(() => {
    if (allProjects.data) {
      dispatch(setProjects(allProjects.data));
    }
  }, [allProjects, dispatch]);

  // get project on project query change
  useEffect(() => {
    if (queryId) {
      getProjectById(queryId);
      dispatch(setActiveProject(queryId));
    }
  }, [queryId, getProjectById, dispatch]);

  // set project tasks data
  useEffect(() => {
    if (!project.isFetching && project.data) {
      dispatch(setTaskGroups(project.data.taskGroups));
    }
  }, [project, dispatch]);

  return (
    <div className="container-fluid x-scroll">
      <div className="columns-container">
        <div className="columns">
          {/** TODO: render skeleton loaders while fetching */}
          {groups.map((group) => (
            <div className="column" key={group._id}>
              <TaskGroup group={group} />
            </div>
          ))}

          {/** TODO: do not render while fetching */}
          <div className="column">
            <NewGroup />
          </div>
        </div>
      </div>
    </div>
  );
}
