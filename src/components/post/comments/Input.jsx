import { forwardRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { ReactComponent as Share } from "assets/share.svg";

import styles from "./Input.module.css";

function Input(props) {
  const {
    className,
    classes: { input, button, icon },
    autoFocus,
    onSubmit,
    inputRef,
  } = props;
  return (
    <form className={cx(className, styles.container)} onSubmit={onSubmit}>
      <Share className={cx(styles.icon, icon)} />
      <input
        type="text"
        className={cx(styles.input, input)}
        placeholder="Add a comment"
        required
        autoFocus={autoFocus}
        ref={inputRef}
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
