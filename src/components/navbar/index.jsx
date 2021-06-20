import { useRef } from "react";
import { useHistory } from "react-router-dom";

import Logo from "assets/logo.png";

import buildURL from "utils/buildURL";
import routePaths from "routePaths";

import styles from "./index.module.css";

export default function Header() {
  const history = useHistory();
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = inputRef.current.value;
    event.target.reset();
    history.push(buildURL(routePaths.profile, { username }));
  };

  return (
    <nav className={styles.container}>
      <img src={Logo} alt="Instagram" height="29" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          ref={inputRef}
          className={styles.input}
        />
      </form>
    </nav>
  );
}
