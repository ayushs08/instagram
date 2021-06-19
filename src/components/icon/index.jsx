import cx from "classnames";

import styles from "./index.module.css";

export default function Icon(props) {
  const { className, onClick, ...restProps } = props;
  return (
    <button onClick={onClick} className={cx(styles.container, className)}>
      <img {...restProps} alt="" />
    </button>
  );
}
