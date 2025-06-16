import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("label-component")
export class Label extends LitElement {
  @property({ type: String }) declare name: string;
  @property({ type: Boolean, attribute: "hide-dot" }) declare hideDot: boolean;

  private calculateColorFromName(name: string): string {
    // Simple hash function to generate a consistent number from a string
    let hash = 0;
    for (let i = 0; i < name?.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert to hex color
    let color = "#";
    for (let i = 0; i < 3; i++) {
      // Extract 8 bits (0-255) for each RGB component
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }

    return color;
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 0 var(--space-sm);
      height: 1.3rem;
      border-radius: var(--radius-md);
      font-size: var(--text-xs);
      font-weight: 500;
      background-color: var(--background);
      border: 1px solid rgba(var(--accent-rgb), 0.5);
      white-space: nowrap;
      margin-right: var(--space-xs);
      vertical-align: baseline;
      transform: translateY(-0.1em);
    }

    .color-dot {
      width: var(--space-sm);
      height: var(--space-sm);
      border-radius: 9999px;
      flex-shrink: 0;
    }

    .tag-text {
      color: var(--foreground);
    }

    @media (max-width: 767px) {
      :host {
        gap: 6px;
      }

      .color-dot {
        width: 7px;
        height: 7px;
      }
    }
  `;

  render() {
    const hexColor = this.calculateColorFromName(this.name);

    return html`
      ${!this.hideDot
        ? html`<div
            class="color-dot"
            style="background-color: ${hexColor};"
          ></div>`
        : ""}
      <span class="tag-text">${this.name}</span>
    `;
  }
}
