declare namespace Express {
  export interface Request {
    user: {
      id?: number | string;
      isAdmin?: boolean;
    };
  }
}
