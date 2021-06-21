import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { v4 as getUUID } from "uuid";

import MetaTitle from "components/MetaTitle";
import Header from "components/post/Header";
import Comments from "components/post/comments";
import Actions from "components/post/Actions";
import Input from "components/post/comments/Input";

import styles from "./Post.module.css";

export default function Post() {
  const [loaded, setLoaded] = useState(false);
  const [index, setIndex] = useState(-1);
  const [data, setData] = useState({});
  const { uuid } = useParams();
  const inputRef = useRef(null);

  const getPostsDetails = () =>
    JSON.parse(localStorage.getItem("postsDetails"));

  const setPostsDetails = (data) =>
    localStorage.setItem("postsDetails", JSON.stringify(data));

  useEffect(() => {
    const data = getPostsDetails().find((item, index) => {
      if (item.uuid === uuid) {
        setIndex(index);
        return true;
      }
      return false;
    });
    setData(data);
    setLoaded(true);
  }, [uuid]);

  if (!loaded) return "Loading...";

  const {
    displayURL,
    username,
    profilePicURL,
    place,
    comments,
    likedByViewer,
    bookmarkedByViewer,
    likeCount,
    caption,
    time,
  } = data;

  const updateStorage = (updatedData) => {
    setData(updatedData);
    const updatedPostsDetails = getPostsDetails();
    updatedPostsDetails.splice(index, 1, updatedData);
    setPostsDetails(updatedPostsDetails);
  };

  const handleLike = () => {
    const isLiked = !likedByViewer;
    const updatedLikeCount = isLiked
      ? Number(likeCount) + 1
      : Number(likeCount) - 1;
    const updatedPostData = {
      ...data,
      likedByViewer: isLiked,
      likeCount: String(updatedLikeCount),
    };
    updateStorage(updatedPostData);
  };

  const updateComments = (updatedComments) => {
    const updatedPostData = { ...data, comments: updatedComments };
    updateStorage(updatedPostData);
  };

  const handleCommentButton = () => {
    inputRef.current.focus();
  };

  const getCommentData = (comment) => ({
    comment,
    uuid: getUUID(),
    time: new Date().toDateString(),
    username,
    profilePicURL,
    replies: [],
  });

  const handleComment = (comment) => {
    const commentData = getCommentData(comment);
    const updatedComments = [...comments, commentData];
    updateComments(updatedComments);
  };

  const handleCommentLike = ({ index: commentIndex }) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].likedByViewer =
      !updatedComments[commentIndex].likedByViewer;
    updateComments(updatedComments);
  };

  const handleReply = ({ reply, uuid }) => {
    const updatedComments = [...comments];
    updatedComments.forEach(function updateReplies(item) {
      if (item.uuid === uuid) {
        const replyData = getCommentData(reply);
        item.replies.push(replyData);
      } else {
        item.replies.forEach(updateReplies);
      }
    });
    updateComments(updatedComments);
  };

  const handleReplyLike = ({ uuid }) => {
    const updatedComments = [...comments];
    updatedComments.forEach(function updateReplies(item) {
      if (item.uuid === uuid) {
        item.likedByViewer = !item.likedByViewer;
      } else {
        item.replies.forEach(updateReplies);
      }
    });
    updateComments(updatedComments);
  };

  return (
    <>
      <MetaTitle title={`@${username}'s Instagram Photo: ${caption}`} />
      <div className={styles.grid}>
        <img src={displayURL} alt="" className={styles.image} />
        <Header
          className={styles.header}
          username={username}
          profilePicURL={profilePicURL}
          place={place}
        />
        <div className={styles.captionContainer}>
          <div
            className={styles.caption}
            dangerouslySetInnerHTML={{
              __html: caption.replace(/\n/g, "<br />"),
            }}
          ></div>
          <div className={styles.time}>{new Date(time).toDateString()}</div>
        </div>
        <Comments
          comments={comments}
          className={styles.comments}
          onLike={handleCommentLike}
          onReply={handleReply}
          onReplyLike={handleReplyLike}
        />
        <Actions
          className={styles.actions}
          likes={likeCount}
          onLike={handleLike}
          onComment={handleCommentButton}
          liked={likedByViewer}
          bookmarked={bookmarkedByViewer}
        />
        <Input
          className={styles.input}
          ref={inputRef}
          onSubmit={handleComment}
        />
      </div>
    </>
  );
}
