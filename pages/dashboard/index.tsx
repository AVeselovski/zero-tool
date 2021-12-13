// zero-tool.com/dashboard
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useFetchProjectsQuery } from "features/projects/projectsApiSlice";

import Container from "components/ui/Container";

/**
 * Lists available projects for starters. More design comes later...
 *
 * - Should not show project select in header
 * - /projects route should redirect to /dashboard
 */

export default function DashboardPage({ initProjects }: { initProjects: IProject[] }) {
  const [projects, setProjects] = useState(initProjects);
  const { data = null, isFetching } = useFetchProjectsQuery();

  useEffect(() => {
    if (data?.data) {
      setProjects(data?.data);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Dashboard (username) | Zero Tool</title>
        <meta name="description" content="Description of this app..." />
      </Head>

      <Container isFluid>
        {!projects.length && isFetching && "Loading..."}

        {!projects.length && !isFetching && "No projects yet!"}

        {projects.map((p) => (
          <div key={p._id}>
            <Link href={`/projects/${p._id}`}>{p.title}</Link>
          </div>
        ))}
      </Container>
    </>
  );
}

import dbConnect from "lib/dbConnect";
import Project from "models/project";
import { IProject } from "types";

export async function getStaticProps() {
  await dbConnect();

  const result = await Project.find({}).select({ title: 1 });
  const projects = result.map((p) => ({
    _id: p._id.toString(),
    title: p.title,
  }));

  return {
    props: {
      initProjects: projects,
    },
    revalidate: 60,
  };
}
