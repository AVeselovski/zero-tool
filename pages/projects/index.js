// zero-tool.com/projects
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="container">
      <h1>Projects page</h1>
      <ul>
        <li>
          <Link href="/projects/project-x">Project X</Link>
        </li>
        <li>
          <Link href="/projects/project-y">Project Y</Link>
        </li>
      </ul>
    </div>
  );
}
