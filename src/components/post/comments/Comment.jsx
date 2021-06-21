import { useState } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import cx from "classnames";
import pluralize from "pluralize";

import timeFormat from "utils/timeFormat";

import Input from "./Input";
import Like from "components/post/Like";

import styles from "./Comment.module.css";

function Comment(props) {
  const {
    comment,
    profilePicURL,
    time,
    username,
    uuid,
    likedByViewer,
    onLike,
    replies,
    className,
    index,
    onReply,
    onReplyLike,
    depth,
    likeCount,
  } = props;

  const [showInput, setShowInput] = useState(false);

  const handleReplyClick = () => setShowInput(!showInput);

  const handleReplySubmit = (reply) => {
    setShowInput(false);
    onReply({ reply, uuid });
  };

  return (
    <>
      <div key={uuid} className={cx(styles.container, className)}>
        <LazyLoad>
          <img src={profilePicURL} alt="" className={styles.profilePic} />
        </LazyLoad>
        <div className={styles.content}>
          <div className={styles.comment}>
            <span className={styles.username}>{username}</span>&nbsp;
            {comment}
          </div>
          <Like
            onLike={() => onLike({ index, uuid })}
            liked={likedByViewer}
            width="15"
            className={styles.likeButton}
          />
          <span className={styles.time}>{timeFormat(time)}</span>
          {Number(likeCount) > 0 && (
            <span className={styles.likeCount}>
              {likeCount}&nbsp;{pluralize("like", Number(likeCount))}
            </span>
          )}
          <button className={styles.replyButton} onClick={handleReplyClick}>
            Reply
          </button>
          {showInput && (
            <Input
              className={styles.inputContainer}
              classes={{
                input: styles.input,
                button: styles.postButton,
                icon: styles.icon,
              }}
              autoFocus
              onSubmit={handleReplySubmit}
            />
          )}
        </div>
      </div>
      {replies.length > 0 && (
        <div className={styles.repliesContainer}>
          {replies.map((item, replyIndex) => (
            <Comment
              key={item.uuid}
              {...item}
              index={replyIndex}
              onLike={onReplyLike}
              className={styles.reply}
              onReply={onReply}
              depth={depth + 1}
              onReplyLike={onReplyLike}
            />
          ))}
        </div>
      )}
    </>
  );
}

Comment.propTypes = {
  profilePicURL: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  onLike: PropTypes.func.isRequired,
  className: PropTypes.string,
  likedByViewer: PropTypes.bool,
  index: PropTypes.number.isRequired,
  replies: PropTypes.array,
  onReply: PropTypes.func.isRequired,
  onReplyLike: PropTypes.func,
  depth: PropTypes.number,
  likeCount: PropTypes.string.isRequired,
};

Comment.defaultProps = {
  className: "",
  replies: [],
  likedByViewer: false,
  depth: 1,
  onReplyLike: null,
};

export default Comment;
