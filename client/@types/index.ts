import React from "react";

export type FieldReferenceType = React.MutableRefObject<HTMLInputElement>;

export interface FieldInitialProps<Element extends React.ElementType> {
  as?: Element;
  children?: React.ReactNode;
  innerRef?: FieldReferenceType;
}

export type FieldProps<Element extends React.ElementType> =
  FieldInitialProps<Element> &
    Omit<React.ComponentProps<Element>, keyof FieldInitialProps<Element>>;

export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;