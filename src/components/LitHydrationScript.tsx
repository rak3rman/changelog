"use client";

import { useEffect, useState } from "react";

// Importing the components for hydration
export default function LitHydrationScript() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Only run once
    if (hydrated) return;

    // Dynamically import Lit components on the client only
    const importComponents = async () => {
      try {
        // Import components one by one to prevent multiple Lit version warning
        // We need to import the modules in sequence
        await import("./lit/CollapsibleSection");
        await import("./lit/Label");
        await import("./lit/LogHeader");
        await import("./lit/ReleaseSection");

        console.debug("Lit components hydrated");

        // Mark as hydrated
        setHydrated(true);

        // Signal hydration is complete
        window.dispatchEvent(new CustomEvent("lit-components-hydrated"));
      } catch (err) {
        console.error("Error hydrating Lit components:", err);
      }
    };

    // Start the import process
    importComponents();
  }, [hydrated]);

  // This component doesn't render anything visible
  return null;
}
