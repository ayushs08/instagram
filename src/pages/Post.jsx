import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { v4 as getUUID } from "uuid";

import timeFormat from "utils/timeFormat";

import MetaTitle from "components/MetaTitle";
import Loader from "components/Loader";
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
    let postsDetails = getPostsDetails();
    (async () => {
      if (!postsDetails) {
        const module = await import("data/postsDetails.json");
        postsDetails = module.default.details;
        setPostsDetails(postsDetails);
      }
      const data = postsDetails.find((item, index) => {
        if (item.uuid === uuid) {
          setIndex(index);
          return true;
        }
        return false;
      });
      setData(data);
      setLoaded(true);
    })();
  }, [uuid]);

  if (!loaded) return <Loader />;

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
    const isLiked = likedByViewer;
    const _likeCount = Number(likeCount);
    const updatedLikeCount = isLiked ? _likeCount - 1 : _likeCount + 1;
    const updatedPostData = {
      ...data,
      likedByViewer: !isLiked,
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
    time: new Date().toString(),
    username,
    profilePicURL,
    replies: [],
    likeCount: "0",
  });

  const handleComment = (comment) => {
    const commentData = getCommentData(comment);
    const updatedComments = [...comments, commentData];
    updateComments(updatedComments);
  };

  const handleCommentLike = ({ index: commentIndex }) => {
    const updatedComments = [...comments];
    const item = updatedComments[commentIndex];
    const isLiked = item.likedByViewer;
    item.likedByViewer = !isLiked;
    const _likeCount = Number(item.likeCount);
    const updatedLikeCount = isLiked ? _likeCount - 1 : _likeCount + 1;
    item.likeCount = String(updatedLikeCount);
    updateComments(updatedComments);
  };

  const updateReplies = ({ reply, uuid, type }) => {
    const updatedComments = [...comments];
    updatedComments.forEach(function updateReplies(item) {
      if (item.uuid === uuid) {
        switch (type) {
          case "add":
            const replyData = getCommentData(reply);
            item.replies.push(replyData);
            break;
          case "like":
            const isLiked = item.likedByViewer;
            item.likedByViewer = !isLiked;
            const _likeCount = Number(item.likeCount);
            const updatedLikeCount = isLiked ? _likeCount - 1 : _likeCount + 1;
            item.likeCount = String(updatedLikeCount);
            break;
          default:
            break;
        }
      } else {
        item.replies.forEach(updateReplies);
      }
    });
    updateComments(updatedComments);
  };

  const handleReply = (params) => {
    updateReplies({ ...params, type: "add" });
  };

  const handleReplyLike = (params) => {
    updateReplies({ ...params, type: "like" });
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
          <div className={styles.time}>{timeFormat(time, true)}</div>
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
