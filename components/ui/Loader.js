const Loader = ({ className = "", isBlock = false, isMini = false }) => {
  const classNames = className ? className.split(" ") : [];
  isBlock && classNames.push("block");
  isMini && classNames.push("mini");

  return (
    <div className={["loader", ...classNames].join(" ")}>
      <div className="loader-ring"></div>
    </div>
  );
};

export default Loader;
