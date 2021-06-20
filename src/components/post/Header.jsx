import PropTypes from "prop-types";
import cx from "classnames";
import { Link } from "react-router-dom";

import routePaths from "routePaths";
import buildURL from "utils/buildURL";

import styles from "./Header.module.css";

function Header(props) {
  const { className, profilePicURL, username, place } = props;
  return (
    <div className={cx(className, styles.container)}>
      <img
        src={profilePicURL}
        alt=""
        height="40"
        width="40"
        className={styles.profilePic}
      />
      <div>
        <Link
          to={buildURL(routePaths.profile, { username })}
          className={styles.username}
        >
          {username}
        </Link>
        <div className={styles.location}>{place}</div>
      </div>
      <div className={styles.dots}>•••</div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string.isRequired,
  profilePicURL: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
};

export default Header;
