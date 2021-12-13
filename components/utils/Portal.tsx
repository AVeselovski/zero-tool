import { useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
  parent?: Node | null;
  className: string;
};

/**
 * React Portal wrapper for spawning children anywhere in the DOM tree.
 * Defaults to `document.body` when parent is not provided.
 *
 * @param props.children React node to spawn
 * @param props.parent Parent node (`ref`) to spawn child in
 * @param props.className Custom class names
 */
export default function Portal({ children, parent, className }: Props) {
  const el = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body;
    const classList = ["portal-container", ...className.split(" ")];

    classList.forEach((item) => el.classList.add(item));
    target.appendChild(el);

    return () => {
      target.removeChild(el);
    };
  }, [el, parent, className]);

  return ReactDOM.createPortal(children, el);
}
