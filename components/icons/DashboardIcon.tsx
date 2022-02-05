function DashboardIcon({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number | string;
}) {
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
      <rect x={4} y={4} width={16} height={16} rx={2}></rect>
      <path d="M4 9h8"></path>
      <path d="M12 15h8"></path>
      <path d="M12 4v16"></path>
    </svg>
  );
}

export default DashboardIcon;
