import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

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

  const handleLike = () => {
    const updatedData = { ...data, likedByViewer: !likedByViewer };
    setData(updatedData);
    const updatedPostsDetails = getPostsDetails();
    updatedPostsDetails.splice(index, 1, updatedData);
    setPostsDetails(updatedPostsDetails);
  };

  const handleCommentLike = (index) => {};

  const handleCommentButton = () => {
    inputRef.current.focus();
  };

  const handleComment = () => {};

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
          <div className={styles.time}>{time}</div>
        </div>
        <Comments
          comments={comments}
          className={styles.comments}
          onLike={handleCommentLike}
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
