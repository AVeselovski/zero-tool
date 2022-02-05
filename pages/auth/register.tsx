// zero-tool.com/login
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";

import Container from "components/ui/Container";

export default function RegisterPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    console.log(email, username, password, confirmPassword);

    // 1. Make request to zero-api to create a user
    // 2. Redirect to login
  }

  return (
    <>
      <Head>
        <title>Sign up | Zero Tool</title>
        <meta name="description" content="Description of this app..." />
      </Head>

      <Container className="flex flex-col justify-center pt-0">
        <div className="w-72 mx-auto pt-6">
          <h1 className="text-3xl mb-4 text-center">
            Sign up to{" "}
            <Link href="/">
              <a className="mt-4 no-underline font-light text-blue-400">Zero Tool</a>
            </Link>
          </h1>
          <div className="text-center mb-14">
            <Link href="/auth/login">Log in instead</Link>
          </div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <label>Email</label>
              <input className="input big" ref={emailRef} type="email" />
            </div>
            <div className="input-group mb-3">
              <label>Username</label>
              <input className="input big" ref={usernameRef} type="text" />
            </div>
            <div className="input-group mb-3">
              <label>Password</label>
              <input className="input big" ref={passwordRef} type="password" />
            </div>
            <div className="input-group mb-10">
              <label>Confirm password</label>
              <input className="input big" ref={confirmPasswordRef} type="password" />
            </div>
            <button className="button big primary w-full" type="submit">
              Sign up
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
