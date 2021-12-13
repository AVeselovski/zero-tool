import { useState } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { removeTask, moveTask } from "features/tasks/tasksSlice";

import Card from "components/ui/Card";
import GroupHeader from "./GroupHeader";
import Task from "./Task";
import TaskModal from "./TaskModal";

import type { IGroup } from "types";

const TaskGroup = ({ group }: { group: IGroup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  function onModalClose() {
    setIsOpen(false);
    setEditTaskId(undefined);
  }

  function onEditTask(id: string) {
    setEditTaskId(id);
    setIsOpen(true);
  }

  async function handleDeleteTask(id: string) {
    try {
      setIsSubmitting(true);
      await dispatch(removeTask({ groupId: group._id, taskId: id })).unwrap();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleMoveTask(id: string) {
    try {
      setIsSubmitting(true);
      await dispatch(moveTask({ currentPosition: group.position as number, taskId: id })).unwrap();
    } catch (error) {
      console.error("Failed to move task:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Card isGroup>
        <GroupHeader groupId={group._id} title={group.title} />

        <div>
          {group.tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              isSubmitting={isSubmitting}
              onDelete={handleDeleteTask}
              onEdit={onEditTask}
              onMove={handleMoveTask}
            />
          ))}
          <button className="button round w-full h-10" onClick={() => setIsOpen(true)}>
            + Add card
          </button>
        </div>
      </Card>

      <TaskModal isOpen={isOpen} onClose={onModalClose} groupId={group._id} taskId={editTaskId} />
    </>
  );
};

export default TaskGroup;
