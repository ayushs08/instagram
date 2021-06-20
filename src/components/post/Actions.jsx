import PropTypes from "prop-types";
import cx from "classnames";

import Icon from "components/icon";

import { ReactComponent as Comment } from "assets/comment.svg";
import { ReactComponent as Share } from "assets/share.svg";
import { ReactComponent as Bookmark } from "assets/bookmark.svg";

import Like from "./Like";

import styles from "./Actions.module.css";
function Actions(props) {
  const { className, likes, onLike, onComment, liked } = props;

  return (
    <div className={cx(className, styles.container)}>
      <div className={styles.flex}>
        <Like onLike={onLike} liked={liked} />
        <Icon icon={Comment} className={styles.icon} onClick={onComment} />
        <Icon
          icon={Share}
          className={styles.icon}
          style={{ color: "#262626" }}
        />
        <Icon icon={Bookmark} className={styles.icon} />
      </div>
      <div className={styles.likes}>
        <strong>{likes}</strong>&nbsp;likes
      </div>
    </div>
  );
}

Actions.propTypes = {
  className: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired,
  onComment: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default Actions;
