import { Response } from "express";

export const createError = (res: Response, message: string) => {
  const error = new Error();
  error.message = message;
  return res.json(error);
};
