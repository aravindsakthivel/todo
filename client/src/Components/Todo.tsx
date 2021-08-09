import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useState,
  useEffect,
} from "react";
import { useAction } from "../hooks/UseAction";
import { useTypedSelector } from "../hooks/UseTypedSelector";
import {
  IndivTask,
  FormWrapper,
  TodoWrapper,
  TaskWrapper,
  Title,
} from "./StyledComponents";
import { NewTodoInterface } from "./interfaces";
import { TodoInfo } from "./TodoInfo";
import { useHistory } from "react-router";

interface UpDelInterface {
  (event: MouseEvent<HTMLButtonElement>, id: string): void;
}
const Todo: FC = () => {
  const [newTodo, setNewTodo] = useState<NewTodoInterface>({
    title: "",
    content: "",
    status: "NOT_DONE",
    author: "",
  });
  const history = useHistory();
  const {
    createTodoProcess,
    updateTodoProcess,
    getTodoProcess,
    deleteTodoProcess,
  } = useAction();
  const { todoData, todoError, isTodoLoading } = useTypedSelector(
    (state) => state.todo
  );
  const { isRecentLogin } = useTypedSelector(
    (state) => state.auth
  );
  let isAuth: any = localStorage.getItem("isAuth");
  isAuth = JSON.parse(isAuth);

  useEffect(() => {
    if (!isRecentLogin) {
      getTodoProcess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecentLogin]);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const createTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodoProcess(newTodo);
  };

  const updateTodo: UpDelInterface = (event, id) => {
    updateTodoProcess(id);
  };

  const deleteTodo: UpDelInterface = (event, id) => {
    deleteTodoProcess(id);
  };
  return (
    <TodoWrapper show={isAuth}>
      <Title>My Todos</Title>
      <button
        onClick={() => {
          localStorage.clear();
          history.push("/login");
        }}
      >
        Logout
      </button>
      <FormWrapper>
        <form onSubmit={(e) => createTodo(e)}>
          <div>
            <input
              type="text"
              value={newTodo.title}
              name="title"
              placeholder="title"
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              type="text"
              value={newTodo.content}
              name="content"
              placeholder="content"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <button type="submit" disabled={!isAuth}>
            Add Todo
          </button>
        </form>
      </FormWrapper>
      <TaskWrapper>
        {!todoError ? (
          !isTodoLoading ? (
            <>
              {todoData.length > 0 &&
                todoData.map((item) => (
                  <IndivTask whom={item.status} key={item._id}>
                    <div>
                      <p>{item.title}</p>
                      <p>{item.content}</p>
                    </div>
                    <div>
                      <button onClick={(e) => updateTodo(e, item._id)}>
                        Complete
                      </button>
                      <button onClick={(e) => deleteTodo(e, item._id)}>
                        Delete
                      </button>
                    </div>
                  </IndivTask>
                ))}
            </>
          ) : (
            <div>....isLoading</div>
          )
        ) : (
          <div>Something went wrong</div>
        )}
      </TaskWrapper>
      {isAuth && <TodoInfo />}
    </TodoWrapper>
  );
};

export { Todo };
