import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { PUBLIC } from "../../constants/routes";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import OnlyPublicRoute from "../OnlyPublicRoute/OnlyPublicRoute";

import Home from "../../pages/Public/Home";
import NotFound from "../../pages/Public/NotFound/NotFound";
import SignIn from "../../pages/Public/SignIn";
import SignUp from "../../pages/Public/SignUp";
import Upload from "../../pages/Public/Upload";
import SingleContentView from "../../pages/Public/SingleContentView";
import Category from "../../pages/Public/Category/Category";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={PUBLIC.HOME} exact>
          <Home />
        </Route>
        <Route path={`${PUBLIC.CONTENT}/:contentId`} exact>
          <SingleContentView />
        </Route>
        <Route path={`${PUBLIC.CATEGORY}/:categoryId`} exact>
          <Category />
        </Route>
        <OnlyPublicRoute path={PUBLIC.SIGN_UP} exact>
          <SignUp />
        </OnlyPublicRoute>
        <OnlyPublicRoute path={PUBLIC.SIGN_IN} exact>
          <SignIn />
        </OnlyPublicRoute>
        <PrivateRoute path={PUBLIC.UPLOAD} exact>
          <Upload />
        </PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
