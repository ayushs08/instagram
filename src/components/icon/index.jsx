import cx from "classnames";

import styles from "./index.module.css";

export default function Icon(props) {
  const { className, onClick, src, icon: Svg, ...restProps } = props;
  return (
    <button onClick={onClick} className={cx(styles.container, className)}>
      {Boolean(src) && <img {...restProps} alt="" />}
      {Boolean(Svg) && <Svg {...restProps} />}
    </button>
  );
}
