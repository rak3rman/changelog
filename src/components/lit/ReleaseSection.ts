import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { safeDefineCustomElement } from "../../lib/ComponentRegistry";

export class ReleaseSection extends LitElement {
  @property({ type: String }) declare date: string;
  @property({ type: String }) declare tag: string;

  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--space-5xl);
      border-top: 1px solid var(--border-medium);
    }

    .grid {
      display: grid;
      gap: var(--space-3xl);
      position: relative;
      margin: var(--space-5xl) 0;
    }

    @media (min-width: 768px) {
      .grid {
        grid-template-columns: 180px 1fr;
      }
    }

    .date-column {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      z-index: 10;
    }

    .date-text {
      color: var(--neutral);
      font-size: var(--text-sm);
      font-weight: 400;
      line-height: 1.4;
      padding-top: var(--space-xs);
    }

    .tag-wrapper {
      margin-top: var(--space-xs);
    }

    @media (min-width: 768px) {
      .date-column {
        position: sticky;
        top: 0;
        margin-top: var(--space-2xl);
      }
    }

    .content-column {
      position: relative;
      margin-top: var(--space-2xl);
    }

    @media (max-width: 767px) {
      .content-column {
        margin-top: var(--space-lg);
      }

      .grid {
        gap: var(--space-xl);
        margin: var(--space-3xl) 0;
      }

      .date-text {
        font-size: var(--text-xs);
        padding-top: var(--space-2xl);
      }

      .date-column {
        gap: var(--space-xs);
      }
    }
  `;

  render() {
    return html`
      <section>
        <div class="grid">
          <div class="date-column">
            <div class="date-text">
              ${new Date(
                new Date(this.date).getTime() + 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            ${this.tag
              ? html`<div class="tag-wrapper">
                  <label-component
                    name="${this.tag}"
                    hide-dot
                    muted
                  ></label-component>
                </div>`
              : ""}
          </div>
          <div class="content-column">
            <slot></slot>
          </div>
        </div>
      </section>
    `;
  }
}

// Register the custom element
safeDefineCustomElement("release-section", ReleaseSection);
