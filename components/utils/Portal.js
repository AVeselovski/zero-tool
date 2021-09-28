import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

/**
 * React Portal wrapper for spawning children anywhere in the DOM tree.
 * Defaults to `document.body` when parent is not provided.
 *
 * @param {Object} props React props
 * @param {React.node} props.children React node to spawn.
 * @param {node} props.parent Parent node (`ref`) to spawn child in.
 * @param {string} props.className Custom class names.
 */
export default function Portal({ children, parent, className }) {
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    const classList = ["portal-container"];

    if (className) {
      className.split(" ").forEach((item) => classList.push(item));
    }

    classList.forEach((item) => el.classList.add(item));
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  return ReactDOM.createPortal(children, el);
}
