import { BrowserRouter as Router } from "react-router-dom";

import Routes from "Routes";
import Navbar from "components/navbar";

function App() {
  return (
    <Router basename="/instagram">
      <Navbar />
      <div className="container">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
