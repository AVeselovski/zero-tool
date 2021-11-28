// zero-tool.com/dashboard
import Head from "next/head";
import Link from "next/link";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import { setProjects } from "@features/projects/projectsSlice";

import Container from "@components/ui/Container";

/**
 * Lists available projects for starters...
 *
 * - Should not show project select in header
 * - Project links to /projects/:id
 * - /projects route should redirect to /dashboard
 */
export default function DashboardPage({ projects }) {
  // const dispatch = useDispatch();

  /** ?! Not sure if necessary */
  // useEffect(() => {
  //   dispatch(setProjects(projects));
  // }, [projects, dispatch]);
  /** ?! */

  return (
    <>
      <Head>
        <title>Dashboard | Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>
      <Container isFluid>
        {!projects.length && "Loading..."}

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

export async function getStaticProps() {
  await dbConnect();

  const result = await Project.find({}).select({ title: 1 });
  const projects = result.map((p) => ({
    _id: p._id.toString(),
    title: p.title,
  }));

  return {
    props: {
      projects,
    },
    revalidate: 1,
  };
}
