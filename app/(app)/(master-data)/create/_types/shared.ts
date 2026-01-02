export type InitialTask = {
  state: "initial";
};

export type TaskFile = {
  name: string;
  path: string;
};

export type UploadedTask = {
  state: "uploaded";
  spec: TaskFile;
  stp: TaskFile;
};

export type Task = InitialTask | UploadedTask;

