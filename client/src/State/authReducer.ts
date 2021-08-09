import { authConstant } from "./actionTypes";
import { AuthConstantActionTypes } from "./actionTypeInterface";
import { CommonUserInfoInterface } from "../Components";

interface AuthStateInterface {
  authError: {} | null;
  isAuthloading: boolean;
  userInfo: CommonUserInfoInterface | {};
  isAuth: boolean | string | null;
  isRecentLogin: boolean;
}

const initState: AuthStateInterface = {
  authError: null,
  isAuthloading: false,
  userInfo: {},
  isAuth: localStorage.getItem("isAuth") || false,
  isRecentLogin: false,
};

const authReducer = (
  state: AuthStateInterface = initState,
  action: AuthConstantActionTypes
): AuthStateInterface => {
  switch (action.type) {
    case authConstant.USER_SIGNUP_REQUEST:
      return {
        ...state,
        isAuthloading: true,
      };
    case authConstant.USER_SIGNUP_SUCCESS:
      localStorage.setItem("isAuth", "true");
      return {
        ...state,
        isAuthloading: false,
        userInfo: action.payload,
        isAuth: true,
        isRecentLogin: true,
      };
    case authConstant.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isAuthloading: false,
        isAuth: false,
        authError: action.payload,
      };
    case authConstant.USER_LOGIN_REQUEST:
      return {
        ...state,
        isAuthloading: true,
      };
    case authConstant.USER_LOGIN_SUCCESS:
      localStorage.setItem("isAuth", "true");
      return {
        ...state,
        isAuthloading: false,
        userInfo: action.payload,
        isAuth: true,
        isRecentLogin: true,
      };
    case authConstant.USER_LOGIN_FAILURE:
      return {
        ...state,
        isAuthloading: false,
        isAuth: false,
        authError: action.payload,
      };
    default:
      return state;
  }
};

export { authReducer };
