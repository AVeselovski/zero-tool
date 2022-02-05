// zero-tool.com/login
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import React, { useRef, useState } from "react";

import Container from "components/ui/Container";

import type { RedirectableProviderType } from "next-auth/providers";

const ERRORS: {
  [key: string]: string;
} = {
  CredentialsSignin: "Invalid email or password!",
};

export default function LoginPage() {
  const router = useRouter();

  const { data: session } = useSession();
  if (session) {
    router.push("/dashboard");
  }

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInError, setSignInError] = useState<String | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSigningIn(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const result = await signIn<RedirectableProviderType | undefined>("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setSignInError(ERRORS[result.error]);
      setIsSigningIn(false);
    }

    // TODO: redirect to dashboard or active project if exists (local storage)
    if (result?.ok) {
      router.push("/dashboard");
    }
  }

  return (
    <>
      <Head>
        <title>Login | Zero Tool</title>
        <meta name="description" content="Description of this app..." />
      </Head>

      <Container className="flex flex-col justify-center pt-0">
        <div className="w-72 mx-auto pt-6">
          <h1 className="text-3xl mb-4 text-center">
            Login to{" "}
            <Link href="/">
              <a className="mt-4 no-underline font-light text-blue-400">Zero Tool</a>
            </Link>
          </h1>
          <div className="text-center mb-14">
            <Link href="/auth/register">Sign up instead</Link>
          </div>

          {signInError && <div className="-mt-10 mb-4 text-red-500 text-center">{signInError}</div>}

          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <label>Email</label>
              <input className="input big" disabled={isSigningIn} ref={emailRef} type="email" />
            </div>
            <div className="input-group mb-10">
              <label>Password</label>
              <input
                className="input big"
                disabled={isSigningIn}
                ref={passwordRef}
                type="password"
              />
            </div>
            <button className="button big primary w-full" disabled={isSigningIn} type="submit">
              {isSigningIn ? "Signin in..." : "Log in"}
            </button>
          </form>
        </div>
      </Container>
    </>
  );
}
