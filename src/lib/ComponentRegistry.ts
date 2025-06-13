/**
 * A utility for registering and managing Lit components for SSR
 * This maintains a single source of truth for both server and client
 */

// Define the structure for component configurations
export interface ComponentConfig {
  // The tag name of the component
  tagName: string;

  // The import path relative to src/ directory
  importPath: string;

  // Whether the component is available for SSR
  available: boolean;

  // Optional validation function for props
  validateProps?: (props: Record<string, unknown>) => Record<string, string>;
}

// Register all components
export const COMPONENT_REGISTRY: ComponentConfig[] = [
  {
    tagName: "collapsible-section",
    importPath: "components/lit/CollapsibleSection",
    available: true,
    validateProps: (props) => ({
      title: props.title?.toString() || "",
      childCount: props.childCount?.toString() || "0",
    }),
  },
  {
    tagName: "label-component",
    importPath: "components/lit/Label",
    available: true,
    validateProps: (props) => ({
      name: props.name?.toString() || "",
      "hide-dot": props.hideDot === true ? "true" : "false",
    }),
  },
  {
    tagName: "log-header",
    importPath: "components/lit/LogHeader",
    available: true,
    validateProps: () => ({}),
  },
  {
    tagName: "release-section",
    importPath: "components/lit/ReleaseSection",
    available: true,
    validateProps: (props) => ({
      date: props.date?.toString() || "",
      tag: props.tag?.toString() || "",
    }),
  },
];

/**
 * Get a component config by its tag name
 * @param tagName The tag name to look up
 * @returns The component config or undefined if not found
 */
export function getComponentConfig(
  tagName: string
): ComponentConfig | undefined {
  return COMPONENT_REGISTRY.find((config) => config.tagName === tagName);
}

/**
 * Check if a component is registered and available for use
 * @param tagName The tag name to check
 * @returns True if the component is registered and available
 */
export function isComponentAvailable(tagName: string): boolean {
  const config = getComponentConfig(tagName);
  return Boolean(config && config.available);
}

/**
 * Process and validate component props using its validator
 * @param tagName The component tag name
 * @param props The props to validate
 * @returns Validated props
 */
export function validateComponentProps(
  tagName: string,
  props: Record<string, unknown>
): Record<string, string> {
  const config = getComponentConfig(tagName);

  if (!config || !config.validateProps) {
    // Convert all props to string values
    return Object.entries(props).reduce((acc, [key, value]) => {
      acc[key] = value?.toString() || "";
      return acc;
    }, {} as Record<string, string>);
  }

  return config.validateProps(props);
}

/**
 * Get client-side hydration information
 * @returns Array of objects with component name and import path
 */
export function getClientHydrationInfo() {
  return COMPONENT_REGISTRY.filter((config) => config.available).map(
    (config) => ({
      name: config.tagName,
      importPath: `../${config.importPath}`,
    })
  );
}
