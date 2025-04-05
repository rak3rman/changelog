"use client";

import { createComponent } from "@lit-labs/react";
import { LogHeader } from "../lit/LogHeader";
import React from "react";

// React wrapper for the Lit component
const LogHeaderLit = createComponent({
  tagName: "log-header",
  elementClass: LogHeader,
  react: React,
});

// MDX wrapper component
const LitLogHeader = () => {
  return <LogHeaderLit />;
};

export default LitLogHeader;
