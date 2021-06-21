import { useState } from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import cx from "classnames";

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
  } = props;

  const [showInput, setShowInput] = useState(false);
  const handleReply = () => setShowInput(!showInput);

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
            onLike={() => onLike(index)}
            liked={likedByViewer}
            width="15"
            className={styles.likeButton}
          />
          <span className={styles.time}>{time}</span>
          <button className={styles.replyButton} onClick={handleReply}>
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
            />
          )}
        </div>
      </div>
      <div className={styles.repliesContainer}>
        {replies.length > 0 &&
          replies.map((item, index) => (
            <Comment
              key={item.uuid}
              {...item}
              onLike={onLike}
              index={index}
              className={styles.reply}
            />
          ))}
      </div>
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
};

Comment.defaultProps = {
  className: "",
  replies: [],
  likedByViewer: false,
};

export default Comment;
