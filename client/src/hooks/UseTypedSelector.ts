import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../State";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useTypedSelector };
