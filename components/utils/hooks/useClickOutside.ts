import { useState, useEffect } from "react";

/**
 * Hook for handling closing when clicking outside of an element.
 */
const useClickOutside = (
  el: React.RefObject<HTMLElement>,
  initialState: boolean = false
) => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const clickHandler = (e: Event) => {
      if (el.current !== null && !el.current.contains(e.target as Element)) {
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

  return [isActive, setIsActive] as const;
};

export default useClickOutside;
