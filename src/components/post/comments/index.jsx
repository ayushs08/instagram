import PropTypes from "prop-types";
import cx from "classnames";

import Comment from "./Comment";

import styles from "./index.module.css";
import { useEffect, useRef } from "react";

function Comments(props) {
  const { className, comments, ...restProps } = props;

  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [comments.length]);

  return (
    <div className={cx(className, styles.container)} ref={containerRef}>
      {comments.length === 0
        ? "No comments yet."
        : comments.map((item, index) => (
            <Comment key={item.uuid} {...item} {...restProps} index={index} />
          ))}
    </div>
  );
}

Comments.propTypes = {
  className: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Comments;
