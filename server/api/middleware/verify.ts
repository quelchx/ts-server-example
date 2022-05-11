import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error";

/** middleware to check cookie token */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return next(createError(res,  "No token is present, can't verify"));
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      return next(createError(res, "Token is not valid"));
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(res, "User is not authorized"));
    }
  });
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(res, "Not authorized to do this"));
    }
  });
};
