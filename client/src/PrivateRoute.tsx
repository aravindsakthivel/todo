import React, { FC } from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";

interface RouteInterface extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute: FC<RouteInterface> = ({
  component: Component,
  ...rest
}) => {
  let isAuth: any = localStorage.getItem("isAuth");
  isAuth = JSON.parse(isAuth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export { PrivateRoute };
