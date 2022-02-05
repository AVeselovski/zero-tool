// zero-tool.com/projects/:projectId
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: { destination: "/auth", permanent: false },
    };
  }

  return {
    props: { session },
  };
}

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useFetchProjectsQuery, useFetchProjectByIdQuery } from "app/services/zeroApi";
import { setActiveProject } from "features/projects/projectsSlice";
import { selectLists, selectProject } from "features/project/projectSlice";
import { selectToken } from "features/auth/authSlice";

import Container from "components/ui/Container";
import Columns from "components/general/Columns";
import LoaderIcon from "components/icons/LoaderIcon";
import Sidebar from "components/general/Sidebar";
import List from "features/project/List";
import NewList from "features/project/NewList";

import type { Session } from "next-auth";

export default function ProjectPage({ session }: { session: Session }) {
  const router = useRouter();
  const queryId = router.query.projectId;

  const token = useAppSelector(selectToken);
  const project = useAppSelector(selectProject);
  const lists = useAppSelector(selectLists);

  const dispatch = useAppDispatch();

  useFetchProjectsQuery(undefined, { skip: !token });

  const { isFetching, refetch: refetchProject } = useFetchProjectByIdQuery(queryId as string, {
    skip: !token || !queryId,
  });

  // refetch project data on project query change
  useEffect(() => {
    refetchProject();
    dispatch(setActiveProject(Number(queryId)));
  }, [queryId, refetchProject, dispatch]);

  return (
    <>
      <Head>
        <title>{project.name} | Zero Tool</title>
        <meta name="description" content="Description of this app..." />
      </Head>

      <Sidebar />

      <Container isFluid isScrollable>
        <Columns>
          {/** TODO: render skeleton loaders while fetching */}
          {isFetching && !lists.length && <LoaderIcon className="loader" />}

          {lists.map((list) => (
            <Columns.Col key={list.id}>
              <List list={list} />
            </Columns.Col>
          ))}

          {!isFetching && (
            <Columns.Col>
              <NewList />
            </Columns.Col>
          )}
        </Columns>
      </Container>
    </>
  );
}
