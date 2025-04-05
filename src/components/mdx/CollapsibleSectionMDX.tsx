"use client";

import { createComponent } from "@lit/react";
import { CollapsibleSection } from "../lit/CollapsibleSection";
import React, { Children, isValidElement, ReactElement } from "react";

// React wrapper for the Lit component
const CollapsibleSectionLit = createComponent({
  tagName: "collapsible-section",
  elementClass: CollapsibleSection,
  react: React,
  events: {},
});

// Count only <li> elements within the children
const countListItems = (children: React.ReactNode): number => {
  let count = 0;

  // Helper function to check if a node is an li element
  const isListItem = (node: React.ReactElement): boolean => {
    return node.type === "li";
  };

  // Recursively search for li elements
  const findListItems = (nodes: React.ReactNode) => {
    Children.forEach(nodes, (child) => {
      if (!isValidElement(child)) return;

      const element = child as ReactElement;

      // If this is an li element, count it
      if (isListItem(element)) {
        count++;
      }

      // Check children recursively
      const props = element.props as { children?: React.ReactNode };
      if (props && props.children) {
        findListItems(props.children);
      }
    });
  };

  findListItems(children);
  return count;
};

// MDX wrapper component
const CollapsibleSectionMDX = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  // Count list items
  const childCount = countListItems(children);

  return (
    <CollapsibleSectionLit title={title} childCount={childCount}>
      {children}
    </CollapsibleSectionLit>
  );
};

export default CollapsibleSectionMDX;
