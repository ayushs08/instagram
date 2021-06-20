import PropTypes from "prop-types";

import Icon from "components/icon";

import { ReactComponent as OutlinedHeart } from "assets/heart-outlined.svg";
import { ReactComponent as Heart } from "assets/heart.svg";

function Like(props) {
  const { liked, onLike, ...restProps } = props;
  return (
    <Icon
      icon={liked ? Heart : OutlinedHeart}
      style={liked ? { color: "red" } : null}
      onClick={onLike}
      {...restProps}
    />
  );
}

Like.propTypes = {
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

export default Like;
