import { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

import routePaths from "routePaths";
import buildURL from "utils/buildURL";

import { ReactComponent as Heart } from "assets/heart.svg";
import { ReactComponent as Comment } from "assets/comment.svg";
import { ReactComponent as Grid } from "assets/grid.svg";
import { ReactComponent as Tagged } from "assets/tagged.svg";
import { ReactComponent as List } from "assets/list.svg";

import styles from "./PostsCollection.module.css";

const actions = {
  grid: Grid,
  tagged: Tagged,
  list: List,
};

function PostsCollection({ posts }) {
  const [layout, setLayout] = useState("grid");

  const handleClick = (action) => {
    setLayout(action);
  };

  return (
    <>
      <div className={styles.actions}>
        {Object.keys(actions).map((action) => {
          const Icon = actions[action];
          return (
            <button
              key={action}
              className={cx(styles.actionItem, {
                [styles.active]: action === layout,
              })}
              onClick={() => handleClick(action)}
            >
              <Icon />
            </button>
          );
        })}
      </div>
      <div
        className={cx(styles.container, {
          [styles.singleColumn]: layout === "list",
        })}
      >
        {posts.map(({ uuid, imageURL, likes, comments }) => (
          <LazyLoad
            offset={100}
            once
            height={200}
            key={uuid}
            className={styles.post}
          >
            <Link to={buildURL(routePaths.post, { uuid })}>
              <img src={imageURL} alt="" className={styles.media} />
              <ul className={styles.stats}>
                <li className={styles.listItem}>
                  <Heart className={styles.icon} />
                  {likes}
                </li>
                <li className={styles.listItem}>
                  <Comment width="24" className={styles.icon} />
                  {comments}
                </li>
              </ul>
            </Link>
          </LazyLoad>
        ))}
      </div>
    </>
  );
}

PostsCollection.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsCollection;
