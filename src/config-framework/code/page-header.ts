import { mdiArrowLeft } from "@mdi/js";
import { HomeAssistant, fireEvent} from "custom-card-helpers";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit-element";


declare global 
{
  /*****************************************************************************************************************************/
  /* Purpose: Declare the 'go back' event
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  interface HASSDomEvents 
  {
    "microteq-go-back": undefined;
  }

  /*****************************************************************************************************************************/
  /* Purpose: Assign the HTML tag to this class
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  // interface HTMLElementTagNameMap 
  // {
  //   "extended-gauge-card-page-header": PageHeader;
  // }
}


/*****************************************************************************************************************************/
/* Purpose: Header section of a configuration page
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
//@customElement("extended-gauge-card-page-header")
export class PageHeader extends LitElement 
{
  @property({ type: String }) pageTitle!: string;


  /*****************************************************************************************************************************/
  /* Purpose: Back button has been clicked
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _goBack(): void 
  {
    fireEvent(this, "microteq-go-back");
  }


  /*****************************************************************************************************************************/
  /* Purpose: Render the current HTML element
  /* History: 02-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected render(): TemplateResult 
  {
    return html`
      <div class="header">
        <div class="back-title">
          <ha-icon-button
            .label=${"Go Back"}
            .path=${mdiArrowLeft}
            @click=${this._goBack}>
          </ha-icon-button>
          <span>${this.pageTitle}</span>
        </div>
      </div>
    `;
  }


/*****************************************************************************************************************************/
/* Purpose: Styles of this HTML element
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
static get styles(): CSSResultGroup {
    return css`
      .header 
      {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        user-select: none;
      }

      .back-title 
      {
        display: flex;
        align-items: center;
        font-size: 18px;
      }
    `;
  }
}


/*****************************************************************************************************************************/
/* Purpose: Assign the HTML tag to this class
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
if (!customElements.get("microteq-page-header")) 
{
  customElements.define(`microteq-page-header`, PageHeader);
}
  

