/**
 * Utility for safely registering custom elements
 * Prevents duplicate registrations during development hot reloading
 */

/**
 * Safely register a custom element, preventing duplicate registrations
 * This is useful during development with hot module replacement
 * @param tagName The tag name to register
 * @param elementClass The custom element class
 */
export function safeDefineCustomElement(
  tagName: string,
  elementClass: CustomElementConstructor
): void {
  // Only register if we're in a browser environment
  if (typeof window === "undefined" || typeof customElements === "undefined") {
    return;
  }

  // Check if the element is already defined
  if (!customElements.get(tagName)) {
    customElements.define(tagName, elementClass);
  } else if (process.env.NODE_ENV === "development") {
    // In development, log a debug message instead of warning
    console.debug(
      `Custom element '${tagName}' already registered (likely due to HMR)`
    );
  }
}
