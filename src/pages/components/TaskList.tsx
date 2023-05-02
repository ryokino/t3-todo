import React from "react";
import { api } from "~/utils/api";
import TaskItem from "./TaskItem";

type Task = {
  id: string;
  title: string;
  body: string;
};

const TaskList = () => {
  const { data, isLoading, error } = api.todo.getTasks.useQuery();

  if (isLoading) return <div>Loading task list ...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <ul>
      {data?.map((task: Task) => (
        <TaskItem
          key={task.id}
          taskId={task.id}
          body={task.body}
          title={task.title}
        />
      ))}
    </ul>
  );
};

export default TaskList;
