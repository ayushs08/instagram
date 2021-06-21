import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { ReactComponent as Share } from "assets/share.svg";

import styles from "./Input.module.css";

function Input(props) {
  const [comment, setComment] = useState("");

  const {
    className,
    classes: { input, button, icon },
    autoFocus,
    onSubmit,
    inputRef,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    setComment("");
    onSubmit(comment);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <form className={cx(className, styles.container)} onSubmit={handleSubmit}>
      <Share className={cx(styles.icon, icon)} />
      <input
        type="text"
        className={cx(styles.input, input)}
        placeholder="Add a comment"
        required
        autoFocus={autoFocus}
        ref={inputRef}
        value={comment}
        onChange={handleChange}
      />
      <button className={cx(styles.post, button)}>POST</button>
    </form>
  );
}

Input.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  autoFocus: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

Input.defaultProps = {
  className: "",
  classes: {},
  autoFocus: false,
};

export default forwardRef((props, ref) => <Input {...props} inputRef={ref} />);
