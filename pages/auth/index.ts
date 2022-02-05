export default function AuthPage() {
  return null;
}

export async function getStaticProps() {
  return {
    redirect: {
      destination: "/auth/login",
      permanent: false,
    },
  };
}
