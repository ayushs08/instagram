import { BrowserRouter as Router } from "react-router-dom";

import Routes from "Routes";
import Header from "components/header";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
