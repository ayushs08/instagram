import { Link } from "react-router-dom";

import Logo from "assets/logo.png";
import ThemeMode from "assets/theme-mode.png";
import User from "assets/user.png";
import Icon from "components/icon";

import buildURL from "utils/buildURL";
import routePaths from "routePaths";

import styles from "./index.module.css";

export default function Header() {
  return (
    <nav className={styles.container}>
      <img src={Logo} alt="Instagram" height="29" />
      <div className={styles.flex}>
        <Icon src={ThemeMode} alt="" width="22" className={styles.icon} />
        <Link to={buildURL(routePaths.profile, { user: "unsplash" })}>
          <Icon src={User} alt="" width="22" />
        </Link>
      </div>
    </nav>
  );
}
