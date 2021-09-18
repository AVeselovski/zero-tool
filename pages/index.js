// zero-tool.com/
import Link from "next/link";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Zero Tool</title>
        <meta name="description" content="Description of this thing..." />
      </Head>
      <div className="container-fluid">
        <h1>Home page</h1>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </>
  );
}
