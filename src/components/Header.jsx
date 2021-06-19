import React from "react";
import { Link } from "react-router-dom";

import routePaths from "routePaths";

import buildURL from "utils/buildURL";

export default function Header() {
  return (
    <nav>
      <Link to={buildURL(routePaths.profile, { user: "chief" })}>Profile</Link>
      <Link to={buildURL(routePaths.post, { post: "1234" })}>Post</Link>
    </nav>
  );
}
