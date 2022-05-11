import Axios from "axios";
import type { NextPage } from "next";
import Link from "next/link";
import { useAuthDispatch, useAuthState } from "../context/auth";

const Home: NextPage = () => {
  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const handleLogout = () => {
    dispatch("LOGOUT");
  };

  return (
    <div className="flex flex-col p-4">
      <h2>Temporary</h2>

      <div className="flex gap-5 text-blue-600">
        {!authenticated && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
        {authenticated && (
          <span className="cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Home;
