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
      padding: var(--space-xl) 0;
    }

    :host + :host {
      border-top: 1px solid var(--border-medium);
    }

    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: var(--text-base);
      font-weight: 500;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      text-align: left;
      padding: 0;
      transition: color var(--transition-fast);
    }

    .header:hover {
      color: var(--foreground);
    }

    @media (max-width: 767px) {
      .header {
        font-size: var(--text-sm);
      }
    }

    .chevron {
      width: var(--space-xl);
      height: var(--space-xl);
      color: var(--neutral);
      transition: transform var(--transition-normal),
        color var(--transition-fast);
      flex-shrink: 0;
    }

    .chevron.expanded {
      transform: rotate(180deg);
      color: var(--foreground);
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
      max-height: 1000px;
      opacity: 1;
    }

    @media (max-width: 767px) {
      :host {
        padding: var(--space-lg) 0;
      }

      .chevron {
        width: var(--space-lg);
        height: var(--space-lg);
      }
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
