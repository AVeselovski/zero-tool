import React, { useRef } from "react";

import styles from "./Select.module.css";
import { useClickOutside } from "components/utils/hooks";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import ChevronUpIcon from "@components/icons/ChevronUpIcon";
import CheckIcon from "@components/icons/CheckIcon";

type Props = {
  children?: React.ReactNode;
  className?: string;
  list: { label: string; value: number | null }[] | [];
  onSelect: (val: number) => void;
  selected: { label: string; value: number | null };
};

function Select({ children, className = "", list = [], onSelect = () => {}, selected }: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false);

  const classNames = className.split(" ");

  function formattedString(string: string) {
    if (string.length > 16) {
      return string.substring(0, 16 - 3) + "...";
    }

    return string;
  }

  function handleClick() {
    setIsActive((prevState) => !prevState);
  }

  function handleItemClick(item: number) {
    onSelect(item);
    setIsActive((prevState) => !prevState);
  }

  return (
    <div className={styles.selectContainer}>
      <div className={[styles.selectTrigger, ...classNames].join(" ")} onClick={handleClick}>
        {formattedString(selected?.label) || "..."}{" "}
        {isActive ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
      </div>

      <ul
        className={`${styles.selectList}${isActive ? ` ${styles.isActive}` : ""}`}
        ref={dropdownRef}
      >
        {!list.length && <div className={styles.empty}>No items...</div>}
        {list.map((item) => (
          <li key={item.value}>
            <button
              className={item.value === selected.value ? styles.isSelected : ""}
              disabled={item.value === selected.value}
              onClick={handleItemClick.bind(null, Number(item.value))}
            >
              {item.value === selected.value && <CheckIcon size={18} />}
              {item.label}
            </button>
          </li>
        ))}

        {/* TODO: Alternative way providing list items to allow custom content

          {Array.isArray(children) ? (
            children.map((child, i) => <li key={i}>{child}</li>)
          ) : (
            <li>{children}</li>
          )} 

        */}
      </ul>
    </div>
  );
}

export default Select;
