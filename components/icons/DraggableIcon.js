function DraggableIcon({ className = "", size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx={9} cy={5} r={1}></circle>
      <circle cx={9} cy={12} r={1}></circle>
      <circle cx={9} cy={19} r={1}></circle>
      <circle cx={15} cy={5} r={1}></circle>
      <circle cx={15} cy={12} r={1}></circle>
      <circle cx={15} cy={19} r={1}></circle>
    </svg>
  );
}

export default DraggableIcon;
