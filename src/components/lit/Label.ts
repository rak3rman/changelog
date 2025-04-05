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
      gap: 0.375rem;
      padding: 0 0.5rem;
      margin-top: -0.05rem;
      margin-right: 0.2rem;
      height: 1.4rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      background-color: var(--background);
      border: 1px solid rgba(var(--accent-rgb, 94, 94, 94), 0.5);
      white-space: nowrap;
    }

    .color-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 9999px;
      flex-shrink: 0;
    }

    .tag-text {
      color: var(--foreground);
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
