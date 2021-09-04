// zero-tool.com/projects/:id/edit
import { useRouter } from "next/router";

export default function EditProjectPage() {
  const router = useRouter();

  return (
    <div className="container">
      <h1>Edit project page: {router.query.projectId}</h1>
    </div>
  );
}
