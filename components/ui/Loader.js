const Loader = ({ className = "", isBlock = false }) => {
  const classNames = className ? className.split(" ") : [];
  isBlock && classNames.push("block");

  return (
    <div className={["loader", ...classNames].join(" ")}>
      <div className="loader-ring"></div>
    </div>
  );
};

export default Loader;
