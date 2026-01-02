"use client";

import { createContext, useContext, useReducer } from "react";
import type { Task } from "@/app/(app)/(master-data)/create/_types";

interface TaskContextType {
  task: Task;
  setTask: (task: Task) => void;
  resetTask: () => void;
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

const initialTask: Task = {
  state: "initial",
};

type TaskAction = { type: "set-task"; payload: Task } | { type: "reset-task" };

function taskReducer(_: Task, action: TaskAction): Task {
  switch (action.type) {
    case "set-task":
      return action.payload;
    case "reset-task":
      return initialTask;
    default:
      throw new Error("Invalid Action");
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [task, taskDispatch] = useReducer(taskReducer, initialTask);

  const setTask = (task: Task) => {
    taskDispatch({ type: "set-task", payload: task });
  };

  const resetTask = () => {
    taskDispatch({ type: "reset-task" });
  };

  const value = {
    task,
    setTask,
    resetTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
