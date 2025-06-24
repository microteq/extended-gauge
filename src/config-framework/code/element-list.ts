import { mdiClose, mdiDrag, mdiPencil, mdiPlus } from "@mdi/js";
import { HomeAssistant, fireEvent } from "custom-card-helpers";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, query, state } from "lit-element";
import { repeat } from "lit/directives/repeat.js";


declare global 
{
  /*****************************************************************************************************************************/
  /* Purpose: Declare the 'go back' event
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  interface HASSDomEvents 
  {
    "microteq-element-list-changed": EventValue;
  }

  /*****************************************************************************************************************************/
  /* Purpose: Assign the HTML tag to this class
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  // interface HTMLElementTagNameMap 
  // {
  //   "microteq-element-list": MicroteqElementList;
  // }
}


/*****************************************************************************************************************************/
/* Purpose: Type declarations for custom event parameters
/* History: 01-APR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
type ChangeType =  "add" | "edit" | "remove" | "move";
interface EventValue
{
  elementList: any[];
  index: number;
  change: ChangeType;
}


/*****************************************************************************************************************************/
/* Purpose: Header section of a configuration page
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
//@customElement("microteq-element-list")
export class ElementList extends LitElement 
{
  public hass!: HomeAssistant;
  @property({ attribute: false }) public elementList!: any[];
  @property({ type: Boolean, reflect: true }) sortable = false;
  @property({ type: String }) listTitle!: string;
  @property({ type: String }) listEmptyText!: string;
  @property({ type: String }) addNewText!: string;



  /*****************************************************************************************************************************/
  /* Purpose: Fired when an event has been moved, deleted or added.
  /* History: 24-MAR-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  private _elementListChanged(elementList: any[], index: number, change: ChangeType  ): void 
  {
    fireEvent(this, "microteq-element-list-changed",  {elementList: elementList, index: index, change: change} );
  }


  /*****************************************************************************************************************************/
  /* Purpose: Find new list element id. If one of the existing is out of order, take this id-1, otherwise add 1 to the last id
  /* History: 24-MAR-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  private _findNewElementId (elementList: any[]): number  
  {
    if (elementList.length == 0)
      return 0;
    const sortedElementList = [...elementList].sort((a, b) => a.id - b.id);
    const item = sortedElementList.find((item, index, arr) =>
      index > 0 && item.id !== arr[index - 1].id + 1
    );
    if (item)
      return item.id-1;
    else
      return sortedElementList[sortedElementList.length-1].id + 1;
  };


  /*****************************************************************************************************************************/
  /* Purpose: Add a row to a list of elements
  /* History: 18-FEB-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  private async _addRow(): Promise<void> 
  {
    if (!this.elementList)
      this.elementList = [];
    let newId = this._findNewElementId(this.elementList);
    const newElement: any = {id: newId}
    const newElementList = this.elementList.concat(newElement);
    this._elementListChanged(newElementList, newElementList.length-1, "add");
  }


  /*****************************************************************************************************************************/
  /* Purpose: Add a device entity to the list of managed devices
  /* History: 18-FEB-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  private async _editRow(index: number): Promise<void> 
  {
    this._elementListChanged(this.elementList, index, "edit");
  }


  /*****************************************************************************************************************************/
  /* Purpose: Remove a row from the list
  /* History: 18-FEB-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  private _removeRow(index: number): void 
  {
    if (!this.elementList)
      return;
    let newElementList = this.elementList!.concat();
    newElementList.splice(index, 1);
    this._elementListChanged(newElementList, index, "remove");
  }

  
 /*****************************************************************************************************************************/
  /* Purpose: Called when a row has changed its position in the list (drop)
  /* History: 01-APR-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  private _rowMoved(ev: CustomEvent): void 
  {
    if (ev.detail.oldIndex === ev.detail.newIndex) 
     {
       return;
     }
    const newElementList = this.elementList!.concat();
    newElementList.splice(ev.detail.newIndex!, 0, newElementList.splice(ev.detail.oldIndex!, 1)[0]);
    this._elementListChanged(newElementList, 0, "move");
  }


  /*****************************************************************************************************************************/
  /* Purpose: Render current HTML element
  /* History: 01-APR-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  protected render(): TemplateResult 
  {
    let sortable = false;
    if (this.elementList && this.elementList.length > 1)
    {
      sortable = this.sortable;
    }
    return html`
        <div class="title">
          ${(this.elementList && this.elementList.length > 0) ? this.listTitle : this.listEmptyText}
        </div>
        <ha-sortable 
          .hass="${this.hass}" 
          @item-moved=${this._rowMoved}
          draggable-selector=".draggable"
          handle-selector="ha-svg-icon">
          <mwc-list>
           ${repeat(this.elementList, (element) => element?.id, (element, index) => html `
            <div class="${sortable ? "draggable" : ""} row-container row">
            ${sortable ? html`
              <ha-svg-icon
                class="handle"
                .path=${mdiDrag}
                slot="graphic">
              </ha-svg-icon>
              ` : ''}
              <div class="row-text">
                ${element?.title?.title}
              </div>
              <ha-icon-button
                .label=${this.hass!.localize("ui.components.entity.entity-picker.clear")}
                .path=${mdiClose}
                class="remove-icon"
                .index=${index}
                @click=${() => this._removeRow(index)}>
              </ha-icon-button>
              <ha-icon-button 
                .label=${this.hass!.localize("ui.components.entity.entity-picker.edit")}
                .path=${mdiPencil}
                class="edit-icon"
                .index=${index}
                @click=${() => this._editRow(index)}>
              </ha-icon-button>
            </div>
            `)}
            ${this.elementList.length > 0 &&  (this.elementList![this.elementList.length-1].title?.title ?? "").trim() == ""
              ? html``
              : html`
            <div class="row-container">
              <div class="new-row"
                @click=${this._addRow}>
                ${this.addNewText}
              </div>
              <ha-icon-button
                .label=${this.hass!.localize("ui.components.entity.entity-picker.add")}
                .path=${mdiPlus}
                class="add-icon"
                @click=${this._addRow}>
                </ha-icon-button>
              </div>
            </div>
            `}
          </mwc-list>
        </ha-sortable>
  `;
  }


/*****************************************************************************************************************************/
/* Purpose: Styles of this HTML element
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
static get styles(): CSSResultGroup 
{
    return css`
      .title
      {
        color: var(--mdc-theme-primary,#6200ee);
        pointer-events: none;
        user-select: none;
      }

      .row-container
      {
        display: flex;
        align-items: center;
        user-select: none;
      }

      .row-container.row
      {
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .row-container.row .row-text
      {
        flex-grow: 1;
        display: flex;
        align-items: center;
        color: var(--primary-text-color);
        padding: var(--text-field-padding, 0px 16px);
        background-color: var(--mdc-text-field-fill-color, #f5f5f5);
        height: 56px;
        pointer-events: none;
      }

      .row-container .new-row
      {
        flex-grow: 1;
        cursor: pointer;
      }

      .remove-icon,
      .edit-icon,
      .add-icon
      {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
      }


     .handle {
          cursor: move; /* fallback if grab cursor is unsupported */
          cursor: grab;
        }

            ha-list-item {
          --mdc-list-side-padding: 12px;
          overflow: visible;
        }
    `;
  }
}


/*****************************************************************************************************************************/
/* Purpose: Assign the HTML tag to this class
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
if (!customElements.get("microteq-element-list")) 
{
  customElements.define(`microteq-element-list`, ElementList);
}
  


