import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("collapsible-section")
export class CollapsibleSection extends LitElement {
  @property({ type: String }) declare title: string;
  @property({ type: Number }) declare childCount: number;

  @state() private declare expanded: boolean;

  static styles = css`
    :host {
      display: block;
      padding: 1rem 0rem;
      border-bottom: 1px solid rgba(82, 82, 91, 0.5);
    }
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1rem;
      font-weight: 500;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      text-align: left;
    }
    .chevron {
      width: 1.25rem;
      height: 1.25rem;
      color: rgb(113, 113, 122);
      transition: transform 0.2s;
    }
    .chevron.expanded {
      transform: rotate(0deg);
    }
    .chevron.collapsed {
      transform: rotate(90deg);
    }
    .content {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.2s ease-in-out, opacity 0.2s ease-in-out;
    }
    .content.expanded {
      max-height: 1000px; /* Arbitrary large value */
      opacity: 1;
    }
  `;

  constructor() {
    super();
    this.expanded = false;
    this.childCount = 0;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  render() {
    return html`
      <div>
        <button class="header" @click=${this.toggleExpanded}>
          <span
            >${this.title}
            ${this.childCount > 0 ? html`(${this.childCount})` : null}</span
          >

          <svg
            class="chevron ${this.expanded ? "expanded" : "collapsed"}"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>

        <div class="content ${this.expanded ? "expanded" : ""}">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
