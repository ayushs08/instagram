import { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import routePaths from "routePaths";

import buildURL from "utils/buildURL";

const Profile = lazy(() => import("pages/Profile"));
const Post = lazy(() => import("pages/Post"));

export default function Routes() {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to={buildURL(routePaths.profile, { username: "unsplash" })}
      />
      <Suspense fallback={<div style={{ marginTop: "25px" }}>Loading...</div>}>
        <Route exact path={routePaths.profile} component={Profile} />
        <Route exact path={routePaths.post} component={Post} />
      </Suspense>
    </Switch>
  );
}
