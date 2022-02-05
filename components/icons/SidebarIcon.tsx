function SidebarIcon({
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
      <line x1={9} y1={4} x2={9} y2={20}></line>
    </svg>
  );
}

export default SidebarIcon;
