import { mdiChevronRight } from "@mdi/js";
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  TemplateResult,
} from "lit";
import { customElement, property, query, state } from "lit-element";
import { fireEvent } from "custom-card-helpers";


declare global 
{
  /*****************************************************************************************************************************/
  /* Purpose: Register the 'menu click' event
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  interface HASSDomEvents 
  {
    "microteq-menu-click": 
    {
    };
  }

  /*****************************************************************************************************************************/
  /* Purpose: Assign HTML tag to this class
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  // interface HTMLElementTagNameMap 
  // {
  //   "menu-entry": MenuEntry;
  // }
}


/*****************************************************************************************************************************/
/* Purpose: Menu item on the main configuration page
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
//@customElement("microteq-menu-entry")
export class MenuEntry extends LitElement 
{
  @property({ type: String }) path!: string;
  @property({ type: Boolean, reflect: true }) outlined = false;
  @property({ type: String }) icon = "mdi:format-list-bulleted-type";
  @property() header?: string;
  @property() secondary?: string;


/*****************************************************************************************************************************/
/* Purpose: Render a menu item on the main configuration page
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
protected render(): TemplateResult 
{
    return html`
      <div
        class="menu-entry"
        @click=${this._menuClicked}
        @keydown=${this._menuClicked}
        @focus=${this._focusChanged}
        @blur=${this._focusChanged}
        role="button">
        <ha-icon icon=${this.icon} class="summary-icon">
        </ha-icon>
        <slot name="header">
          <div class="header">
            ${this.header}
            <slot class="secondary" name="secondary">${this.secondary}</slot>
          </div>
        </slot>
        <ha-icon-button style="pointer-events: none;"
          .path=${mdiChevronRight}
          class="summary-icon-right">
          </ha-icon-button>
      </div>
    `;
  }


/*****************************************************************************************************************************/
/* Purpose: Focus has changed
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
private _focusChanged(ev) 
  {
    this.shadowRoot!.querySelector(".top")!.classList.toggle("focused", ev.type === "focus");
  }


/*****************************************************************************************************************************/
/* Purpose: Sub page link has been klicked
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
private _menuClicked(): void
  {
    fireEvent(this, "microteq-menu-click");
  }


/*****************************************************************************************************************************/
/* Purpose: CSS styles for this HTML element
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
static get styles(): CSSResultGroup 
  {
    return css`
      :host 
      {
        display: block;
      }

      :host([outlined]) 
      {
        box-shadow: none;
        border-width: 1px;
        border-style: solid;
        border-color: var(
          --ha-card-border-color,
          var(--divider-color, #e0e0e0)
        );
        border-radius: var(--ha-card-border-radius, 12px);
      }

      .menu-entry 
      {
        width: 100%;
        display: flex;
        gap: 1rem;
        padding: var(--expansion-panel-summary-padding, 0 8px);
        min-height: 48px;
        align-items: center;
        cursor: pointer;
        overflow: hidden;
        font-weight: 500;
        outline: none;
        user-select: none;
      }

      .summary-icon 
      {
        transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        direction: var(--direction);
        color: var(--secondary-text-color);
      }

      .header,
      ::slotted([slot="header"]) 
      {
        flex: 1;
      }

      .secondary 
      {
        display: block;
        color: var(--secondary-text-color);
        font-size: 12px;
      }
    `;
  }
}


/*****************************************************************************************************************************/
/* Purpose: Assign the HTML tag to this class
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
if (!customElements.get("microteq-menu-entry")) 
{
  customElements.define(`microteq-menu-entry`, MenuEntry);
}
    
  
