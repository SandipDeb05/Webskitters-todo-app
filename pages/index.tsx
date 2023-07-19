import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import { useAuth } from "@/context/authContext";
import Head from "next/head";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <main>
      <Head>
        <title>Webskitters Todo App</title>
        <meta name="description" content="Todo App powered by nextjs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!currentUser ? <Login /> : <Dashboard />}
    </main>
  );
}
