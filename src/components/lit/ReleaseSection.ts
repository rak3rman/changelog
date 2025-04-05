import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("release-section")
export class ReleaseSection extends LitElement {
  @property({ type: String }) declare date: string;
  @property({ type: String }) declare tag: string;

  static styles = css`
    :host {
      display: block;
      margin-bottom: 4rem;
      border-top: 1px solid rgba(82, 82, 91, 0.5);
    }
    .grid {
      display: grid;
      gap: 2rem;
      position: relative;
      margin: 3rem 0rem;
    }
    @media (min-width: 768px) {
      .grid {
        grid-template-columns: 180px 1fr;
      }
    }
    .date-column {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: var(--neutral);
      position: sticky;
      top: 0; /* How far from the top of the viewport it should stick */
      margin-top: 1.75rem;
      font-size: 0.9rem;
      z-index: 10; /* Optional: ensures it appears above other content */
    }
    .content-column {
      position: relative;
    }
    .categories {
      margin-top: 2rem;
    }
  `;

  render() {
    return html`
      <section>
        <div class="grid">
          <div class="date-column">
            ${new Date(
              new Date(this.date).getTime() + 24 * 60 * 60 * 1000
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            ${this.tag
              ? html`<div>
                  <label-component
                    name="${this.tag}"
                    hide-dot
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
