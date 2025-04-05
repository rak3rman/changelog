import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("log-header")
export class LogHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .container {
      max-width: 768px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 4rem;
    }
    h1 {
      font-size: 2.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: rgb(161, 161, 170);
      margin-bottom: 1rem;
    }
    .links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      font-size: 0.875rem;
    }
    .link {
      color: rgb(129, 140, 248);
      text-decoration: none;
      transition: color 0.2s;
    }
    .link:hover {
      color: rgb(165, 180, 252);
    }
    .divider {
      color: rgb(82, 82, 91);
    }
    .separator {
      border-top: 1px solid rgba(82, 82, 91, 0.5);
      margin: 4rem 0;
    }
  `;

  render() {
    return html`
      <main class="container">
        <div class="header">
          <h1>Changelog</h1>
          <p class="subtitle">New updates and improvements to our product.</p>
          <div class="links">
            <a href="#" class="link">Subscribe to updates</a>
            <span class="divider">•</span>
            <a href="#" class="link">Follow us on X</a>
          </div>
        </div>

        <slot></slot>
      </main>
    `;
  }
}
