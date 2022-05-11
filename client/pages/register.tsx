import React from "react";

import AuthForm from "../components/auth-form";
import type { NextPage } from "next";

const RegisterPage: NextPage = () => {
  return (
    <>
      <AuthForm type="register" />
    </>
  );
};

export default RegisterPage;
