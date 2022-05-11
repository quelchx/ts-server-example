import React, { FormEvent, useRef, useState } from "react";
import Axios from "axios";
import { useRouter } from "next/router";

import Field from "../components/input-field";

import type { NextPage } from "next";
import type { ChangeEvent, FieldReferenceType } from "../@types";

const RegisterPage: NextPage = () => {
  const [error, setError] = useState<string>();
  const [agreement, setAgreement] = useState(false);

  const email = useRef() as FieldReferenceType;
  const username = useRef() as FieldReferenceType;
  const password = useRef() as FieldReferenceType;

  const router = useRouter();

  const registerUser = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await Axios.post("/auth/register", {
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
      });

      router.push("/");
    } catch (err: any) {
      const { error } = err.response.data;
      error.includes("duplicate key")
        ? setError("Duplicate Email or Username")
        : setError("Something went wrong");
    }
  };

  return (
    <div className="flex">
      <div className="bg-blue-600 h-screen sm:min-w-[10%]" />
      <div className="mx-4 mb-20 flex items-center">
        <div className="flex flex-col mx-3 space-y-2">
          <div className="space-y-2 pb-1">
            <h2 className="font-bold text-3xl sm:text-2xl">
              Register an account
            </h2>
            <p className="leading-5 text-gray-700">
              It's quick, easy and free. We do not collect any of your
              information
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
            <Field
              innerRef={email}
              id="email"
              placeholder="Email"
              type="email"
              required
            >
              <label htmlFor="Email">Email</label>
            </Field>
            <Field
              innerRef={password}
              id="password"
              type="password"
              placeholder="Password"
            >
              <label htmlFor="Password">Password</label>
            </Field>
            <div className="flex items-center space-x-2">
              <Field
                checked={agreement}
                onChange={(e: ChangeEvent) => setAgreement(e.target.checked)}
                type="checkbox"
                className="items-start"
              />
              <p>I agree to the terms and conditions</p>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={!agreement}
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

export default RegisterPage;
