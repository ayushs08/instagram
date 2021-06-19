import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import routePaths from "routePaths";

import buildURL from "utils/buildURL";

import Profile from "pages/Profile";
import Post from "pages/Post";

export default function Routes() {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to={buildURL(routePaths.profile, { user: "chief" })}
      />
      <Route exact path={routePaths.profile} component={Profile} />
      <Route exact path={routePaths.post} component={Post} />
    </Switch>
  );
}
