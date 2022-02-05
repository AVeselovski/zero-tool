// zero-tool.com/projects
export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/dashboard",
      permanent: false,
    },
  };
}

import Container from "components/ui/Container";

export default function ProjectsPage() {
  return <Container>Projects page (unused for now)</Container>;
}
