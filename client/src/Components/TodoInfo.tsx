import { useEffect, FC, useState } from "react";
import { TotalTask } from "./StyledComponents";
import { useTypedSelector } from "../hooks/UseTypedSelector";

const TodoInfo: FC = () => {
  const { todoData, isTodoLoading } = useTypedSelector((state) => state.todo);
  const [todoCompleted, setCompleted] = useState<number>(0);
  useEffect(() => {
    let completed: number = 0;
    todoData.forEach((todo) => {
      if (todo.status === "DONE") {
        completed += 1;
      }
    });
    setCompleted(completed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTodoLoading]);
  return (
    <>
      {isTodoLoading ? (
        <div>...isLoading</div>
      ) : todoData.length > 0 ? (
        <TotalTask>
          <p>Total task: {todoData.length}</p>
          <p>UnCompleted task: {todoData.length - todoCompleted}</p>
          <p>Completed task: {todoCompleted}</p>
        </TotalTask>
      ) : (
        ""
      )}
    </>
  );
};

export { TodoInfo };
