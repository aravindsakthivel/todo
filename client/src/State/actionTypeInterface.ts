import { authConstant, todoConstant } from "./actionTypes";
import { CommonUserInfoInterface, TodoInterface } from "../Components";

// <--- Auth interface --->

interface UserSignupRequestActionInterface {
  type: authConstant.USER_SIGNUP_REQUEST;
}

interface UserSignupSuccessActionInterface {
  type: authConstant.USER_SIGNUP_SUCCESS;
  payload: CommonUserInfoInterface;
}

interface UserSignupFailureActionInterface {
  type: authConstant.USER_SIGNUP_FAILURE;
  payload: any;
}

interface UserLoginRequestActionInterface {
  type: authConstant.USER_LOGIN_REQUEST;
}

interface UserLoginSuccessActionInterface {
  type: authConstant.USER_LOGIN_SUCCESS;
  payload: CommonUserInfoInterface;
}

interface UserLoginFailureActionInterface {
  type: authConstant.USER_LOGIN_FAILURE;
  payload: any;
}

export type AuthConstantActionTypes =
  | UserSignupRequestActionInterface
  | UserSignupSuccessActionInterface
  | UserSignupFailureActionInterface
  | UserLoginRequestActionInterface
  | UserLoginSuccessActionInterface
  | UserLoginFailureActionInterface

// <--- Todo interface --->

interface CreateTodoRequestActionInterface {
  type: todoConstant.CREATE_TODO_REQUEST;
}

interface CreateTodoSuccessActionInterface {
  type: todoConstant.CREATE_TODO_SUCCESS;
  payload: TodoInterface;
}

interface CreateTodoFailureActionInterface {
  type: todoConstant.CREATE_TODO_FAILURE;
  payload: any;
}

interface UpdateTodoRequestActionInterface {
  type: todoConstant.UPDATE_TODO_REQUEST;
}

interface UpdateTodoSuccessActionInterface {
  type: todoConstant.UPDATE_TODO_SUCCESS;
  payload: TodoInterface;
}

interface UpdateTodoFailureActionInterface {
  type: todoConstant.UPDATE_TODO_FAILURE;
  payload: any;
}

interface DeleteTodoRequestActionInterface {
  type: todoConstant.DELETE_TODO_REQUEST;
}

interface DeleteTodoSuccessActionInterface {
  type: todoConstant.DELETE_TODO_SUCCESS;
  payload: TodoInterface;
}

interface DeleteTodoFailureActionInterface {
  type: todoConstant.DELETE_TODO_FAILURE;
  payload: any;
}

interface GetTodoRequestActionInterface {
  type: todoConstant.GET_TODO_REQUEST;
}

export interface GetTodoSuccessActionInterface {
  type: todoConstant.GET_TODO_SUCCESS;
  payload: TodoInterface[];
}

interface GetTodoFailureActionInterface {
  type: todoConstant.GET_TODO_FAILURE;
  payload: any;
}

export type TodoConstantActionTypes =
  | CreateTodoRequestActionInterface
  | CreateTodoSuccessActionInterface
  | CreateTodoFailureActionInterface
  | UpdateTodoRequestActionInterface
  | UpdateTodoSuccessActionInterface
  | UpdateTodoFailureActionInterface
  | DeleteTodoRequestActionInterface
  | DeleteTodoSuccessActionInterface
  | DeleteTodoFailureActionInterface
  | GetTodoRequestActionInterface
  | GetTodoSuccessActionInterface
  | GetTodoFailureActionInterface;
