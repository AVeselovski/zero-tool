// zero-tool.com/dashboard
import { getSession } from "next-auth/react";

import { ZERO_API_URL } from "utils/constants";

import type { GetServerSidePropsContext } from "next";
import type { IProject } from "types";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: "/auth", permanent: false },
    };
  }

  /* init page with projects */
  const response = await fetch(`${ZERO_API_URL}/boards`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const projects = await response.json();

  return {
    props: {
      initProjects: projects,
      session,
    },
  };
}

import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFetchProjectsQuery } from "app/services/zeroApi";
import { selectToken } from "features/auth/authSlice";
import { setProjects, selectProjects } from "features/projects/projectsSlice";

import Container from "components/ui/Container";
import Card from "components/ui/Card";
import ArrowRightIcon from "components/icons/ArrowRightIcon";

import type { Session } from "next-auth";

export default function DashboardPage({
  initProjects,
  session,
}: {
  initProjects: IProject[];
  session: Session;
}) {
  const projects = useAppSelector(selectProjects);
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();

  /* Assure token exists, before trying to fetch (Next-auth + RTK Query quirks) */
  const { isFetching } = useFetchProjectsQuery(undefined, { skip: !token });

  useEffect(() => {
    dispatch(setProjects(initProjects));
  }, [dispatch, initProjects]);

  return (
    <>
      <Head>
        <title>Dashboard ({session?.user?.name}) | Zero Tool</title>
        <meta name="description" content="Description of this app..." />
      </Head>

      <Container isFluid>
        {!projects.length && isFetching && "Loading..."}

        {!projects.length && !isFetching && "No projects yet!"}

        <h2 className="mb-4">Recent ({projects.length})</h2>
        <div className="flex flex-wrap gap-3 mb-8">
          {/* TODO: implement recent projects functionality (localStorage or Next backend) */}
          {projects.map(
            (p, i) =>
              i < 2 && (
                <Link href={`/projects/${p.id}`} key={p.id}>
                  <a className="block no-underline text-gray-700">
                    <Card className="w-72 m-0" key={p.id}>
                      <Card.Body>
                        <div className="flex justify-between items-center text-lg font-medium pb-4">
                          {p.name}
                          <ArrowRightIcon />
                        </div>
                        Fugit quo enim neque, quis cum, libero minima delectus incidunt doloremque
                        cumque ex, ut aspernatur.
                      </Card.Body>
                      <Card.Footer>
                        {p.users?.length && p.users.length > 1 ? (
                          <span className="bg-gray-700 text-white p-1 text-xs font-medium rounded">
                            Shared
                          </span>
                        ) : (
                          <span className="bg-gray-300 p-1 text-xs font-medium rounded">
                            Private
                          </span>
                        )}
                      </Card.Footer>
                    </Card>
                  </a>
                </Link>
              )
          )}
        </div>

        <h2 className="mb-4">All projects ({projects.length})</h2>
        <div className="flex flex-wrap gap-3">
          {projects.map((p, i) => (
            <Link href={`/projects/${p.id}`} key={p.id}>
              <a className="block no-underline text-gray-700">
                <Card className="w-72 m-0" key={p.id}>
                  <Card.Body>
                    <div className="flex justify-between items-center text-lg font-medium pb-4">
                      {p.name}
                      <ArrowRightIcon />
                    </div>
                    Fugit quo enim neque, quis cum, libero minima delectus incidunt doloremque
                    cumque ex, ut aspernatur.
                  </Card.Body>
                  <Card.Footer>
                    {p.users?.length && p.users.length > 1 ? (
                      <span className="bg-gray-700 text-white p-1 text-xs font-medium rounded">
                        Shared
                      </span>
                    ) : (
                      <span className="bg-gray-300 p-1 text-xs font-medium rounded">Private</span>
                    )}
                  </Card.Footer>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
