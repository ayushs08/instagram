import { useEffect } from "react";
import PropTypes from "prop-types";

export default function MetaTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}

MetaTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
