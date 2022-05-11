import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col p-4">
      <h2>Temporary</h2>

      <div className="flex gap-5 text-blue-600">
        <Link href="/register">Register</Link>
        <Link href="login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
