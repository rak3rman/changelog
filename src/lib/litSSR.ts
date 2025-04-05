import {
  isComponentAvailable,
  validateComponentProps,
} from "./ComponentRegistry";

// No need to import components here as they're loaded on-demand
// This helps prevent multiple registration issues

/**
 * Safely escape a value for use in HTML attributes
 * @param value The value to escape
 * @returns Escaped string value
 */
function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  const str = String(value);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Server-side renders a Lit component
 * @param tagName The custom element tag name
 * @param props Properties to pass to the component
 * @returns String with the rendered HTML
 */
export async function renderLitComponent(
  tagName: string,
  props: Record<string, unknown> = {}
): Promise<string> {
  // Check if the component is available in registry
  if (!isComponentAvailable(tagName)) {
    console.warn(`Component ${tagName} is not available for SSR`);
    return `<div>Component ${tagName} not available for SSR</div>`;
  }

  // Load component if needed (asynchronously)
  try {
    // Dynamically import component based on tagName
    if (tagName === "info-card") {
      await import("../components/lit/InfoCard");
    } else if (tagName === "status-badge") {
      await import("../components/lit/StatusBadge");
    }
  } catch (error) {
    console.error(`Error loading component ${tagName}:`, error);
  }

  // Process and validate props
  const processedProps = validateComponentProps(tagName, props);

  // Render the component as a simple HTML string
  const attributesString = Object.entries(processedProps)
    .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
    .join(" ");

  return `<${tagName} ${attributesString}></${tagName}>`;
}
