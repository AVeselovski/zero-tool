// zero-tool.com/dashboard
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import dbConnect from "../../lib/dbConnect";
import Project from "../../models/project";
import { useStore } from "../../utils/store";

/**
 * Lists available projects for starters...
 *
 * - Does not show project select in header
 * - Project links to /projects/:id, /projects route is unused and redirects to dashboard
 */

export default function DashboardPage({ projects }) {
  const { dispatch } = useStore();

  useEffect(() => {
    dispatch({ type: "SET_PROJECTS", projects });
  }, [projects, dispatch]);

  return (
    <>
      <Head>
        <title>Dashboard | Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>
      <div className="container-fluid">
        {!projects.length && "LOADING"}
        {projects.map((p) => (
          <div key={p._id}>
            <Link href={`/projects/${p._id}`}>{p.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  await dbConnect();

  const result = await Project.find({});
  const projects = result.map((e) => ({
    _id: e._id.toString(),
    title: e.title,
  }));

  return {
    props: {
      projects,
    },
    revalidate: 1,
  };
}
