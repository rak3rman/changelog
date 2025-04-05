// Define custom components to be used in MDX
import React from "react";
import CollapsibleSectionMDX from "./mdx/CollapsibleSectionMDX";
import LabelMDX from "./mdx/LabelMDX";
import Image from "next/image";

// Custom image component to constrain width
interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ResponsiveImage = ({ alt, ...props }: ResponsiveImageProps) => {
  // Set default width and height for remote images if not provided
  const isRemoteImage = props.src?.startsWith("http");
  const imageProps = {
    ...props,
    alt: alt || "",
    width: props.width || (isRemoteImage ? 1200 : undefined),
    height: props.height || (isRemoteImage ? 630 : undefined),
  };

  return (
    <span style={{ maxWidth: "100%", overflow: "hidden" }}>
      <Image
        {...imageProps}
        alt={imageProps.alt}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          borderRadius: "0.5rem",
        }}
      />
    </span>
  );
};

export const mdxComponents = {
  // Add your custom MDX components here
  CollapsibleSection: CollapsibleSectionMDX,
  Label: LabelMDX,
  // Override default img with responsive version
  img: ResponsiveImage,
};

export default mdxComponents;
