import React from "react";

export type FieldReferenceType = React.MutableRefObject<HTMLInputElement>;
export type ReactChildren = { children: React.ReactNode };
export interface FieldInitialProps<Element extends React.ElementType> {
  as?: Element;
  children?: React.ReactNode;
  innerRef?: FieldReferenceType;
}

export type FieldProps<Element extends React.ElementType> =
  FieldInitialProps<Element> &
    Omit<React.ComponentProps<Element>, keyof FieldInitialProps<Element>>;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type DocumentResult<T> = {
  _doc: T;
};

export interface UserModel extends DocumentResult<UserModel> {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface AuthState {
  authenticated: boolean;
  user: UserModel | undefined;
  loading: boolean;
}

export interface AuthAction {
  type: string;
  payload: any;
}
