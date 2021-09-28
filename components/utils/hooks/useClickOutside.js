import { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of an element.
 *
 * @param {React.node} el
 * @param {boolean} initialState
 */
const useClickOutside = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const clickHandler = (e) => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };

    if (isActive) {
      window.addEventListener("click", clickHandler);
    }

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};

export default useClickOutside;
