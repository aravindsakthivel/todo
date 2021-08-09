import { bindActionCreators } from "redux";
import { actionCreators } from "../State";
import { useDispatch } from "react-redux";

const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};

export { useAction };
