import PropTypes from "prop-types";
import cx from "classnames";

import Comment from "./Comment";

import styles from "./index.module.css";

function Comments(props) {
  const { className, comments, onLike } = props;

  return (
    <div className={cx(className, styles.container)}>
      {comments.length === 0
        ? "No comments yet."
        : comments.map((item, index) => (
            <Comment key={item.uuid} {...item} onLike={onLike} index={index} />
          ))}
    </div>
  );
}

Comments.propTypes = {
  className: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;
