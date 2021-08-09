import { FC, useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import { useAction } from "../hooks/UseAction";
import {
  LoginWrapper,
  MForm,
  TodoWrapper,
  TaskWrapper,
} from "./StyledComponents";
import { Redirect } from "react-router-dom";
import { useTypedSelector } from "../hooks/UseTypedSelector";

interface LoginSignupInterface {
  email: string;
  password: string;
}

const SignUpLogin: FC = () => {
  let isAuth: any = localStorage.getItem("isAuth");
  const { isAuthloading } = useTypedSelector((state) => state.auth);
  isAuth = JSON.parse(isAuth);
  const [loginSignupInfo, setloginSignupInfo] = useState<LoginSignupInterface>({
    email: "",
    password: "",
  });
  const [crnPage, setCrnPage] = useState<boolean>(false);
  const { userLoginProcess, userSignUpProcess } = useAction();

  const changePage = (event: MouseEvent<HTMLButtonElement>) => {
    setCrnPage(!crnPage);
  };

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;
    setloginSignupInfo({
      ...loginSignupInfo,
      [name]: value,
    });
  };

  const loginSignupUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (crnPage) {
      userLoginProcess(loginSignupInfo);
    } else {
      userSignUpProcess(loginSignupInfo);
    }
  };

  return (
    <TodoWrapper show={isAuth}>
      <TaskWrapper>
        <LoginWrapper>
          {isAuthloading ? (
            <div>....isLoading</div>
          ) : !isAuth ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <u>{crnPage ? "login" : "sign up"}</u>
                </div>
                <button
                  onClick={(e) => changePage(e)}
                  style={{ cursor: "pointer" }}
                >
                  {crnPage ? "sign up" : "login"}
                </button>
              </div>
              <MForm onSubmit={loginSignupUser}>
                <input
                  type="text"
                  value={loginSignupInfo.email}
                  name="email"
                  placeholder="email"
                  onChange={onChangeValue}
                  required
                />
                <input
                  type="password"
                  value={loginSignupInfo.password}
                  name="password"
                  placeholder="password"
                  onChange={onChangeValue}
                  required
                />
                <input
                  type="submit"
                  value={crnPage ? "login" : "sign up"}
                  style={{ cursor: "pointer" }}
                />
              </MForm>
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: "login" },
              }}
            />
          )}
        </LoginWrapper>
      </TaskWrapper>
    </TodoWrapper>
  );
};

export { SignUpLogin };
