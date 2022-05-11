import React, { FormEvent, useRef, useState } from "react";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import Field from "../components/input-field";
import { useAuthDispatch, useAuthState } from "../context/auth";
import type { ChangeEvent, FieldReferenceType } from "../@types";
import { passwordCheck } from "../utils/password-check";

interface AuthFormProps {
  type: "login" | "register";
}

const credentials = [
  "Has no whitespaces",
  "Contains at least one uppercase letter",
  "Contain at least one lowercase letter",
  "Contains at least one special symbol ex) !@#$%&",
  "Contains at least one digit",
  "Must be at least 8 characters long",
  "Password can not be P@ssw0rd",
];

const HighlightText = () => {
  return (
    <span className="relative inline-block before:block before:absolute before:-inset-0.5 before:-skew-y-2 before:bg-blue-500">
      <span className="relative text-white">account</span>
    </span>
  );
};

const AuthForm = ({ type }: AuthFormProps) => {
  const [error, setError] = useState<string>();
  const [agreement, setAgreement] = useState(false);

  const email = useRef() as FieldReferenceType;
  const username = useRef() as FieldReferenceType;
  const password = useRef() as FieldReferenceType;

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();
  const router = useRouter();
  if (authenticated) router.push("/");

  const authenticateUser = async (event: FormEvent) => {
    event.preventDefault();
    if (type === "register") {
      const verify: any = passwordCheck(password.current.value);
      if (!verify.status) {
        return setError(verify.message);
      }
    }

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
                <>
                  Register your <HighlightText />
                </>
              ) : (
                <>
                  Login to your <HighlightText />
                </>
              )}
            </h2>
            <div className="leading-5 text-gray-700">
              {type === "register" ? (
                <>
                  <p className="py-0.5">
                    It's quick, easy and free. We do not collect any of your
                    information.
                  </p>
                  <small className="font-bold">
                    If your already a user, click{" "}
                    <Link href="/login">
                      <span className="duration-200 cursor-pointer hover:underline hover:text-blue-600">
                        here
                      </span>
                    </Link>{" "}
                    to login.
                  </small>
                  <div className="mx-auto">
                    <details className="pt-2 pb-0.5" open>
                      <summary className="text-sm font-semibold leading-6 select-none hover:cursor-pointer ">
                        Password Credentials
                      </summary>
                      <div className="text-sm leading-6 pl-7 text-slate-600 ">
                        {credentials.map((credential) => (
                          <li className="px-0.5" key={credential}>
                            {credential}
                          </li>
                        ))}
                      </div>
                    </details>
                  </div>
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
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </div>
          <form onSubmit={authenticateUser} className="flex flex-col gap-2">
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
