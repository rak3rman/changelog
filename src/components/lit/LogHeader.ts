import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("log-header")
export class LogHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .container {
      max-width: var(--container-max-width);
      margin: 0 auto;
    }

    .header {
      margin: var(--space-4xl) 0;
    }

    h1 {
      font-family: var(--font-serif);
      font-size: var(--text-4xl);
      font-weight: 600;
      margin: 0 0 var(--space-md) 0;
      color: inherit;
      line-height: 1.1;
      letter-spacing: 0.01em;
    }

    @media (max-width: 767px) {
      h1 {
        font-size: var(--text-3xl);
      }

      .header {
        margin-bottom: var(--space-3xl);
      }
    }

    .subtitle {
      color: var(--neutral);
      padding-bottom: var(--space-sm);
      line-height: 1.65;
      margin: 0;
      font-size: var(--text-lg);
    }

    @media (max-width: 767px) {
      .subtitle {
        font-size: var(--text-base);
        padding-right: var(--space-4xl);
      }
    }

    .link {
      color: var(--neutral);
      text-decoration: none;
      font-size: var(--text-sm);
      transition: color var(--transition-fast);
    }

    .link:hover {
      color: var(--foreground);
    }
  `;

  render() {
    return html`
      <main class="container">
        <div class="header">
          <h1>Changelog</h1>
          <p class="subtitle">
            Personal updates, improvements, and notes from Radison Akerman.
          </p>
          <a href="https://radison.io" class="link">radison.io</a>
        </div>

        <slot></slot>
      </main>
    `;
  }
}
