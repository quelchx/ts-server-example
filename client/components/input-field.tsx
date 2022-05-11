import React from "react";
import { FieldProps } from "../@types";

const Field = <Element extends React.ElementType = "input">({
  children,
  innerRef,
  ...others
}: FieldProps<Element>) => {
  const Component = "input";
  return (
    <div className="flex flex-col items-start space-y-1">
      {children}
      <Component
        ref={innerRef}
        className="border w-full placeholder:text-gray-300 border-gray-400 px-2 py-1.5 rounded shadow-lg"
        {...others}
      />
    </div>
  );
};

export default Field;
