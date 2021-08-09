import React, { FC } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { Route as PublicRoute, Switch } from "react-router-dom";
import { PageNotfFound, Todo, SignUpLogin } from "./Components";

const App: FC = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Todo} />
      <PublicRoute path="/login" component={SignUpLogin} />
      <PublicRoute>
        <PageNotfFound />
      </PublicRoute>
    </Switch>
  );
};

export default App;
