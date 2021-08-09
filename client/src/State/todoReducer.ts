import { todoConstant } from "./actionTypes";
import { TodoConstantActionTypes } from "./actionTypeInterface";
import { TodoInterface } from "../Components";

interface TodoStateInterface {
  todoError: {} | null;
  isTodoLoading: boolean;
  todoData: TodoInterface[] | [];
}

const initState: TodoStateInterface = {
  todoError: null,
  isTodoLoading: false,
  todoData: [],
};

const todoReducer = (
  state: TodoStateInterface = initState,
  action: TodoConstantActionTypes
): TodoStateInterface => {
  switch (action.type) {
    case todoConstant.CREATE_TODO_REQUEST:
      return {
        ...state,
        isTodoLoading: true,
      };
    case todoConstant.CREATE_TODO_SUCCESS:
      return {
        ...state,
        isTodoLoading: false,
        todoData: [...state.todoData, action.payload],
      };
    case todoConstant.CREATE_TODO_FAILURE:
      return {
        ...state,
        isTodoLoading: false,
        todoError: action.payload,
      };
    case todoConstant.UPDATE_TODO_REQUEST:
      return {
        ...state,
        isTodoLoading: true,
      };
    case todoConstant.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        isTodoLoading: false,
        todoData: state.todoData.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.status = "DONE";
            return todo;
          }
          return todo;
        }),
      };
    case todoConstant.UPDATE_TODO_FAILURE:
      return {
        ...state,
        isTodoLoading: false,
        todoError: action.payload,
      };
    case todoConstant.DELETE_TODO_REQUEST:
      return {
        ...state,
        isTodoLoading: true,
      };
    case todoConstant.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isTodoLoading: false,
        // eslint-disable-next-line array-callback-return
        todoData: state.todoData.filter((todo) => {
          if (todo._id !== action.payload._id) {
            return todo;
          }
        }),
      };
    case todoConstant.DELETE_TODO_FAILURE:
      return {
        ...state,
        isTodoLoading: false,
        todoError: action.payload,
      };
    case todoConstant.GET_TODO_REQUEST:
      return {
        ...state,
        isTodoLoading: true,
      };
    case todoConstant.GET_TODO_SUCCESS:
      return {
        ...state,
        isTodoLoading: false,
        todoData: action.payload,
      };
    case todoConstant.GET_TODO_FAILURE:
      return {
        ...state,
        isTodoLoading: false,
        todoError: action.payload,
      };
    default:
      return state;
  }
};

export { todoReducer };
