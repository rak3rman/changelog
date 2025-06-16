"use client";

import { createComponent } from "@lit-labs/react";
import { BackToTopButton } from "../lit/BackToTopButton";
import React from "react";

// React wrapper for the Lit component
const BackToTopButtonLit = createComponent({
  tagName: "back-to-top-button",
  elementClass: BackToTopButton,
  react: React,
});

// MDX wrapper component
const LitBackToTopButton = () => {
  return <BackToTopButtonLit />;
};

export default LitBackToTopButton;
