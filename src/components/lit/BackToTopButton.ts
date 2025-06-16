import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import { safeDefineCustomElement } from "../../lib/ComponentRegistry";

export class BackToTopButton extends LitElement {
  @state()
  declare isVisible: boolean;

  constructor() {
    super();
    this.isVisible = false;
  }

  static styles = css`
    :host {
      position: fixed;
      bottom: var(--space-3xl);
      right: var(--space-3xl);
      z-index: 1000;
    }

    .back-to-top {
      width: 46px;
      height: 46px;
      border-radius: var(--radius-lg);
      background: color-mix(in srgb, var(--base-100) 65%, transparent);
      backdrop-filter: blur(32px) saturate(200%);
      -webkit-backdrop-filter: blur(32px) saturate(200%);
      border: 1px solid var(--border-light);
      color: var(--accent);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transform: translateY(24px) scale(0.9);
      transition: all 320ms cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 8px 32px
          color-mix(in srgb, var(--foreground) 3%, transparent),
        0 2px 8px color-mix(in srgb, var(--foreground) 2%, transparent),
        inset 0 1px 0 color-mix(in srgb, var(--base-100) 15%, transparent);
      will-change: transform, opacity, box-shadow;
    }

    .back-to-top:hover {
      background: color-mix(in srgb, var(--base-200) 75%, transparent);
      border-color: var(--border-medium);
      color: var(--foreground);
      transform: translateY(0) scale(1.05);
      box-shadow: 0 12px 40px
          color-mix(in srgb, var(--foreground) 4%, transparent),
        0 4px 12px color-mix(in srgb, var(--foreground) 3%, transparent),
        inset 0 1px 0 color-mix(in srgb, var(--base-100) 20%, transparent);
    }

    .back-to-top:active {
      transform: translateY(1px) scale(0.96);
      transition: all 120ms cubic-bezier(0.4, 0, 0.6, 1);
      box-shadow: 0 4px 16px
          color-mix(in srgb, var(--foreground) 3%, transparent),
        0 1px 4px color-mix(in srgb, var(--foreground) 2%, transparent),
        inset 0 1px 0 color-mix(in srgb, var(--base-100) 10%, transparent);
    }

    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .back-to-top svg {
      transition: all 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
      filter: drop-shadow(
        0 1px 2px color-mix(in srgb, var(--foreground) 3%, transparent)
      );
    }

    .back-to-top:hover svg {
      transform: scale(1.1);
      filter: drop-shadow(
        0 2px 4px color-mix(in srgb, var(--foreground) 5%, transparent)
      );
    }

    .back-to-top:active svg {
      transform: scale(1.05);
      transition: all 120ms cubic-bezier(0.4, 0, 0.6, 1);
    }

    @media (max-width: 767px) {
      :host {
        bottom: var(--space-2xl);
        right: var(--space-2xl);
      }

      .back-to-top {
        width: 48px;
        height: 48px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Only add scroll listener if we're in the browser
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", this.handleScroll);
      // Check initial scroll position
      this.handleScroll();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  private handleScroll = () => {
    // Show button when user scrolls down 300px
    this.isVisible = window.pageYOffset > 300;
  };

  private scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    return html`
      <button
        class="back-to-top ${this.isVisible ? "visible" : ""}"
        @click=${this.scrollToTop}
        aria-label="Back to top"
        type="button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    `;
  }
}

// Register the custom element
safeDefineCustomElement("back-to-top-button", BackToTopButton);
