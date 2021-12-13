// zero-tool.com/
import Link from "next/link";
import Head from "next/head";

import Container from "components/ui/Container";

/**
 * Landing page with flashy logo / animation.
 *
 * - Links to login/register
 * - Redirects logged in user to /dashboard or active project if defined in local storage
 */

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>
      <Container>
        <h1>Home page</h1>
        <Link href="/dashboard">Dashboard</Link>
      </Container>
    </>
  );
}
