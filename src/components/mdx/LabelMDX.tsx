"use client";

import { createComponent } from "@lit/react";
import { Label } from "../lit/Label";
import React from "react";

// React wrapper for the Lit component
const LabelLit = createComponent({
  tagName: "label-component",
  elementClass: Label,
  react: React,
});

// MDX wrapper component
const LabelMDX = ({
  name,
  hideDot,
  children,
}: {
  name: string;
  hideDot?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <LabelLit name={name} hideDot={hideDot}>
      {children}
    </LabelLit>
  );
};

export default LabelMDX;
