export type PasswordVerificationState = {
  message: string;
  status: boolean;
};

export const passwordCheck = (password: string): Object => {
  const whitespace = /^(?=.*\s)/;
  const uppercaseChar = /^(?=.*[A-Z]).*$/;
  const lowercaseChar = /(?=.*[a-z])/;
  const digits = /(?=.*[0-9])/;
  const specialChars = /^(?=.*[~`!@#$%^&*()--+={}|\:;"'<>,.?/_₹]).*$/;
  const length = /^.{8,255}$/;

  let verification: PasswordVerificationState = {
    message: "Please enter a password",
    status: false,
  };

  if (whitespace.test(password)) {
    verification.message = "Password contains whitespace";
    return verification;
  }

  if (!uppercaseChar.test(password)) {
    verification.message =
      "Password must contain at least one uppercase character";
    return verification;
  }

  if (!lowercaseChar.test(password)) {
    verification.message = "Password must contain at least one lowercase char";
    return verification;
  }

  if (!digits.test(password)) {
    verification.message = "Password must contain at least one digit";
    return verification;
  }

  if (!specialChars.test(password)) {
    verification.message = "Password must contain one special character";
    return verification;
  }

  if (!length.test(password)) {
    verification.message = "Password must be at least 8 - 255 characters long";
    return verification;
  }

  verification.message = "Password meets requirements";
  verification.status = true;

  return verification;
};
