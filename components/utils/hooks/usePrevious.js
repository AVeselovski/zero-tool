import { useRef } from "react";

/**
 * Use previous state value.
 *
 * @param {*} value Current state value.
 */
function usePrevious(value) {
  const currentRef = useRef(value);
  const previousRef = useRef();

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}

export default usePrevious;
