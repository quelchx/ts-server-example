import React, { FormEvent, useRef, useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import Field from "../components/input-field";
import { useAuthDispatch, useAuthState } from "../context/auth";
import type { ChangeEvent, FieldReferenceType } from "../@types";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [error, setError] = useState<string>();
  const [agreement, setAgreement] = useState(false);

  const email = useRef() as FieldReferenceType;
  const username = useRef() as FieldReferenceType;
  const password = useRef() as FieldReferenceType;

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();
  console.log(dispatch);
  const router = useRouter();
  if (authenticated) router.push("/");

  const registerUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      type === "register"
        ? await Axios.post("/auth/register", {
            email: email.current.value,
            username: username.current.value,
            password: password.current.value,
          })
        : await Axios.post("/auth/login", {
            username: username.current.value,
            password: password.current.value,
          }).then((res) => {
            dispatch("LOGIN", res.data);
          });

      type === "register" ? router.push("/login") : router.back();
    } catch (err: any) {
      console.log(err);
      const { error } = err.response.data;
      error?.includes("duplicate key")
        ? setError("Duplicate Email or Username")
        : setError("Something went wrong");
    }
  };

  return (
    <div className="flex">
      <div className="bg-blue-600 h-screen sm:min-w-[10%]" />
      <div className="flex items-center mx-4 mb-20">
        <div className="flex flex-col mx-3 space-y-2">
          <div className="pb-1 space-y-2">
            <h2 className="text-3xl font-bold sm:text-2xl">
              {type === "register" ? (
                <>Register an account</>
              ) : (
                <>Login to your account</>
              )}
            </h2>
            <p className="leading-5 text-gray-700">
              {type === "register" ? (
                <>
                  It's quick, easy and free. We do not collect any of your
                  information
                </>
              ) : (
                <>
                  If you don't have an account you can register{" "}
                  <Link href="/register">
                    <span className="text-blue-500 cursor-pointer hover:text-blue-600">
                      here
                    </span>
                  </Link>
                </>
              )}
            </p>
            {error && <p className="text-red-600">{error}</p>}
          </div>
          <form onSubmit={registerUser} className="flex flex-col gap-2">
            <Field
              innerRef={username}
              id="username"
              placeholder="Username"
              type="text"
              required
            >
              <label htmlFor="Username">Username</label>
            </Field>
            {type === "register" && (
              <Field
                innerRef={email}
                id="email"
                placeholder="Email"
                type="email"
                required
              >
                <label htmlFor="Email">Email</label>
              </Field>
            )}
            <Field
              innerRef={password}
              id="password"
              type="password"
              placeholder="Password"
            >
              <label htmlFor="Password">Password</label>
            </Field>
            {type === "register" && (
              <div className="flex items-center space-x-2">
                <Field
                  checked={agreement}
                  onChange={(e: ChangeEvent) => setAgreement(e.target.checked)}
                  type="checkbox"
                  className="items-start"
                />
                <p>I agree to the terms and conditions</p>
              </div>
            )}
            <div className="pt-2">
              <button
                type="submit"
                disabled={type === "register" ? !agreement : false}
                className="w-full disabled:bg-red-600 disabled:bg-opacity-50 delay-200 p-2.5 bg-blue-500 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
