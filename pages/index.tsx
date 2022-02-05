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
        <div className="text-center my-14 mt-32">
          <h1 className="mb-4 text-5xl">Kanban project management tool</h1>
          <p className="mb-14 text-2xl">
            Pretend to be <i>agile</i> with this zero agility tool!
          </p>
          <div>
            <Link href="/auth/register">
              <a className="button big primary round">Get started</a>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
