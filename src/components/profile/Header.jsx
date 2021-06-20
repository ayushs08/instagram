import PropTypes from "prop-types";
import cx from "classnames";
import LazyLoad from "react-lazyload";

import styles from "./Header.module.css";

function Header(props) {
  const {
    bio,
    businessContact,
    profilePicURL,
    followers,
    following,
    fullName,
    isFollowing,
    postsCount,
    username,
  } = props;
  return (
    <header className={styles.container}>
      <LazyLoad className={styles.profilePic}>
        <img src={profilePicURL} alt="" width="100%" height="100%" />
      </LazyLoad>
      <div className={styles.info}>
        <div className={styles.usernameContainer}>
          <h1 className={styles.username}>{username}</h1>
          <button className={cx(styles.follow, styles.semiBold)}>
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <div className={styles.semiBold}>{postsCount}</div>posts
          </li>
          <li className={styles.listItem}>
            <div className={styles.semiBold}>{followers}</div>
            followers
          </li>
          <li className={styles.listItem}>
            <div className={styles.semiBold}>{following}</div>
            following
          </li>
        </ul>
      </div>
      <div className={styles.bioContainer}>
        <h3 className={cx(styles.fullName, styles.semiBold)}>{fullName}</h3>
        <div
          dangerouslySetInnerHTML={{ __html: bio.replace(/\n/g, "<br />") }}
        ></div>
      </div>
      <div className={styles.ctaContainer}>
        <a
          href={`tel:${businessContact}`}
          className={cx(styles.cta, styles.semiBold)}
        >
          Call
        </a>
      </div>
    </header>
  );
}

Header.propTypes = {
  bio: PropTypes.string.isRequired,
  businessContact: PropTypes.string.isRequired,
  followers: PropTypes.string.isRequired,
  following: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  postsCount: PropTypes.string.isRequired,
  profilePicURL: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Header;
