import { authConstant, todoConstant } from "./actionTypes";
import axios from "axios";
import { Dispatch } from "redux";
import {
  AuthConstantActionTypes,
  TodoConstantActionTypes,
  GetTodoSuccessActionInterface,
} from "./actionTypeInterface";
import { LogingSignUpDataInterface, NewTodoInterface } from "../Components";

axios.defaults.baseURL = "http://localhost:5000/graphql";
axios.defaults.method = "POST";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");
axios.defaults.headers.post["Content-Type"] = "application/json";

const userSignUpProcess =
  ({ email, password }: LogingSignUpDataInterface) =>
  async (dispatch: Dispatch<AuthConstantActionTypes>) => {
    dispatch({
      type: authConstant.USER_SIGNUP_REQUEST,
    });
    try {
      const { data } = await axios({
        data: {
          query: `mutation{
                    signUp(fields: {email: "${email}", password: "${password}"}){
                      email
                      _id
                      token
                    }
                  }`,
        },
      });
      localStorage.setItem("token", data.data.signUp.token);
      dispatch({
        type: authConstant.USER_SIGNUP_SUCCESS,
        payload: data.data.signUp,
      });
    } catch (err: any) {
      dispatch({
        type: authConstant.USER_SIGNUP_FAILURE,
        payload: err.message,
      });
    }
  };

const userLoginProcess =
  ({ email, password }: LogingSignUpDataInterface) =>
  async (
    dispatch: Dispatch<AuthConstantActionTypes | GetTodoSuccessActionInterface>
  ) => {
    dispatch({
      type: authConstant.USER_LOGIN_REQUEST,
    });
    try {
      const { data } = await axios({
        data: {
          method: "post",
          url: "http://localhost:5000/graphql",
          headers: {
            "Content-Type": "application/json",
          },
          query: `mutation {
                    loginUser(fields: { email: "${email}", password: "${password}" }) {
                      _id
                      email
                      token
                      todos{
                        _id
                        title
                        content
                        status
                        created_at
                        author
                        updated_at
                      }
                    }
                  }`,
        },
      });
      const { todos, ...userInfo } = data.data.loginUser;
      localStorage.setItem("token", userInfo.token);
      dispatch({
        type: authConstant.USER_LOGIN_SUCCESS,
        payload: userInfo,
      });
      dispatch({
        type: todoConstant.GET_TODO_SUCCESS,
        payload: todos,
      });
    } catch (err: any) {
      dispatch({
        type: authConstant.USER_LOGIN_FAILURE,
        payload: err.message,
      });
    }
  };

const createTodoProcess =
  ({ title, content }: NewTodoInterface) =>
  async (dispatch: Dispatch<TodoConstantActionTypes>) => {
    dispatch({
      type: todoConstant.CREATE_TODO_REQUEST,
    });
    try {
      const token: string | null = localStorage.getItem("token");
      const { data } = await axios({
        data: {
          method: "post",
          url: "http://localhost:5000/graphql",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          query: `mutation {
                      createTodo(fields: {title: "${title}", content: "${content}", status: NOT_DONE}) {
                        _id
                        title
                        content
                        author
                        status
                        created_at
                        updated_at
                      }
                    }`,
        },
      });
      dispatch({
        type: todoConstant.CREATE_TODO_SUCCESS,
        payload: data.data.createTodo,
      });
    } catch (err: any) {
      dispatch({
        type: todoConstant.CREATE_TODO_FAILURE,
        payload: err.message,
      });
    }
  };

const updateTodoProcess =
  (id: string) => async (dispatch: Dispatch<TodoConstantActionTypes>) => {
    dispatch({
      type: todoConstant.UPDATE_TODO_REQUEST,
    });
    try {
      const token: string | null = localStorage.getItem("token");
      const { data } = await axios({
        data: {
          method: "post",
          url: "http://localhost:5000/graphql",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          query: `mutation {
                    updateTodo(fields: { id: "${id}", status: DONE }) {
                      _id
                      title
                      content
                      status
                      author
                      created_at
                      updated_at
                    }
                  }`,
        },
      });
      dispatch({
        type: todoConstant.UPDATE_TODO_SUCCESS,
        payload: data.data.updateTodo,
      });
    } catch (err: any) {
      dispatch({
        type: todoConstant.UPDATE_TODO_FAILURE,
        payload: err.message,
      });
    }
  };

const deleteTodoProcess =
  (id: string) => async (dispatch: Dispatch<TodoConstantActionTypes>) => {
    dispatch({
      type: todoConstant.DELETE_TODO_REQUEST,
    });
    try {
      const token: string | null = localStorage.getItem("token");
      const { data } = await axios({
        data: {
          method: "post",
          url: "http://localhost:5000/graphql",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          query: `mutation {
                    deleteTodo(id: "${id}") {
                      _id
                      title
                      content
                      status
                      author
                      created_at
                      updated_at
                    }
                  }`,
        },
      });
      dispatch({
        type: todoConstant.DELETE_TODO_SUCCESS,
        payload: data.data.deleteTodo,
      });
    } catch (err: any) {
      dispatch({
        type: todoConstant.DELETE_TODO_SUCCESS,
        payload: err.message,
      });
    }
  };

const getTodoProcess =
  () => async (dispatch: Dispatch<TodoConstantActionTypes>) => {
    dispatch({
      type: todoConstant.GET_TODO_REQUEST,
    });
    try {
      const token: string | null = localStorage.getItem("token");
      const { data } = await axios({
        data: {
          method: "post",
          url: "http://localhost:5000/graphql",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          query: `query {
                    todos{
                      _id
                      title
                      content
                      status
                      author
                      created_at
                      updated_at
                    }
                  }`,
        },
      });
      dispatch({
        type: todoConstant.GET_TODO_SUCCESS,
        payload: data.data.todos,
      });
    } catch (err: any) {
      dispatch({
        type: todoConstant.GET_TODO_FAILURE,
        payload: err.message,
      });
    }
  };

export {
  userSignUpProcess,
  userLoginProcess,
  createTodoProcess,
  deleteTodoProcess,
  updateTodoProcess,
  getTodoProcess,
};
