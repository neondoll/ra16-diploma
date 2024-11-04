import PropTypes from "prop-types";
import { cn } from "../lib/utils";

function Message({ text, type }) {
  if (!text) {
    return null;
  }

  return <p className={cn("message", type)}>{text}</p>;
}

Message.propTypes = {
  text: PropTypes.string,
  type: PropTypes.oneOf(["error", "success"]).isRequired,
};

export default Message;
