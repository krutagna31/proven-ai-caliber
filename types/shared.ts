export type Client = "sunpharma";

export type Option<T> = {
  label: string;
  value: T;
};

export type BaseInput<T extends string = string> = {
  name: T;
  label: string;
  description: string;
};

export type FileInput<T extends string = string> = BaseInput<T> & {
  id: string;
  type: "file";
  accept: string;
};

export type SelectInput<T extends string = string> = BaseInput<T> & {
  id: string;
  type: "select";
  placeholder: string;
  options: Option<string>[];
};

export type MultiSelectInput<T extends string = string> = BaseInput<T> & {
  id: string;
  type: "multi-select";
  placeholder: string;
  options: Option<string>[];
};

export type TextInput<T extends string = string> = BaseInput<T> & {
  id: string;
  placeholder: string;
  type: "text" | "password" | "email" | "number";
};

export type FormInput<T extends string = string> =
  | FileInput<T>
  | SelectInput<T>
  | MultiSelectInput<T>
  | TextInput<T>;
