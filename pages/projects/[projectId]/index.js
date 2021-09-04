// zero-tool.com/projects/:id
import { useRouter } from "next/router";

export default function ProjectPage() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>Project page: {router.query.projectId}</h1>
    </div>
  );
}
