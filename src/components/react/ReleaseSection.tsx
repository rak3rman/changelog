"use client";

import { createComponent } from "@lit/react";
import { ReleaseSection } from "../lit/ReleaseSection";
import React from "react";

// React wrapper for the Lit component
const ReleaseSectionLit = createComponent({
  tagName: "release-section",
  elementClass: ReleaseSection,
  react: React,
});

// MDX wrapper component
const LitReleaseSection = ({
  date,
  tag,
  children,
}: {
  date: string;
  tag: string;
  children: React.ReactNode;
}) => {
  return (
    <ReleaseSectionLit date={date} tag={tag}>
      {children}
    </ReleaseSectionLit>
  );
};

export default LitReleaseSection;
