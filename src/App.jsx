import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "Routes";
import Navbar from "components/navbar";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const profileDetails = localStorage.getItem("profileDetails");
    const postsDetails = localStorage.getItem("postsDetails");
    if (!profileDetails) {
      import("data/profileDetails.json").then((module) => {
        localStorage.setItem("profileDetails", JSON.stringify(module.default));
      });
    }
    if (!postsDetails) {
      import("data/postsDetails.json").then((module) => {
        localStorage.setItem(
          "postsDetails",
          JSON.stringify(module.default.details)
        );
      });
    }
    setLoaded(true);
  }, []);

  if (!loaded) return "Loading...";

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
