import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { PUBLIC } from "../../constants/routes";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
// import OnlyPublicRoute from "../OnlyPublicRoute/OnlyPublicRoute";

import Home from "../../pages/Public/Home";
import NotFound from "../../pages/Public/NotFound/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PUBLIC.HOME} exact>
          <Home />
        </Route>
        <PrivateRoute path="*">
          <NotFound />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}
