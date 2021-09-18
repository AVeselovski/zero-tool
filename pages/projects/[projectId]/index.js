// zero-tool.com/projects/:projectId
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { useStore } from "../../../utils/store";
import api from "../../../utils/api";

import TaskGroup from "../../../components/TaskGroup";
import Loader from "../../../components/ui/Loader";

export default function ProjectPage() {
  const { state, dispatch } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const titleInputRef = useRef();

  const toggleForm = () => {
    setShowForm((val) => !val);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const taskTitle = titleInputRef.current.value;

    const taskGroupData = {
      title: taskTitle,
    };

    setIsSubmitting(true);

    const { data, error } = await api(
      `/projects/${router.query.projectId}/new-group`,
      "POST",
      taskGroupData
    );

    setIsSubmitting(false);

    if (error) {
      // TODO: handle error dispatch
      console.group("ERROR:", error);
    } else {
      /** (?) How to handle "actions" with side effects (e.g. "GET_TASKS") */
      dispatch({ type: "ADD_TASK_GROUP", taskGroup: data });
      /** (?) */

      setShowForm((val) => !val);
    }
  };

  useEffect(() => {
    const _getProject = async () => {
      const { data } = await api(`/projects/${router.query.projectId}`);

      dispatch({ type: "SET_ACTIVE_PROJECT", activeProject: data._id });
      dispatch({ type: "SET_TASK_GROUPS", taskGroups: data.taskGroups });
    };

    const _getProjects = async () => {
      const { data } = await api(`/projects`);

      dispatch({ type: "SET_PROJECTS", projects: data });
    };

    if (router.query.projectId) {
      _getProject();
      _getProjects();
    }
  }, [router.query.projectId, dispatch]);

  return (
    <div className="container-fluid x-scroll">
      <div className="columns-container">
        <div className="columns">
          {state.taskGroups.map((group) => (
            <div className="column" key={group._id}>
              <TaskGroup taskGroup={group} />
            </div>
          ))}
          <div className="column">
            {isSubmitting && <Loader isBlock />}
            {showForm && !isSubmitting && (
              <form onSubmit={submitHandler}>
                <input
                  autoFocus
                  className="big"
                  onBlur={toggleForm}
                  placeholder="Task list title..."
                  ref={titleInputRef}
                  type="text"
                />
              </form>
            )}
            {!showForm && !isSubmitting && (
              <button className="button column-button" onClick={toggleForm}>
                + Add column
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
