export interface CommonUserInfoInterface {
  email: string;
  _id: string;
  token: string;
}

export interface NewTodoInterface {
  title: string;
  content: string;
  status?: "NOT_DONE" | "DONE";
  author?: string;
}

export interface TodoInterface extends NewTodoInterface {
  _id: string;
  created_at: string;
  updated_at: string;
}

export interface LogingSignUpDataInterface {
  email: string;
  password: string;
}
