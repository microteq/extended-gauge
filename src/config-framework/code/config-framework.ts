/*****************************************************************************************************************************/
/* Purpose: Class which handles the config process
/* History: 28-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import { css, html, LitElement, nothing } from "lit";
import { fireEvent, HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import { assert } from "superstruct";
import { property, state } from "lit-element";
import "./menu-entry";
import "./page-header";
import "./element-list";
import { mdiPencil } from "@mdi/js";


/*****************************************************************************************************************************/
/* Purpose: Represents a configuration page
/* Params:  title:              The title of the page, which is displayed in the header of the new page. 
/*          alternative_title:  The optional alternative title, which is displayed instead of the title, i.e. 'Add details', 
/*                              instead of 'Edit details'
/*          sections:           A list of page section objects, which define the layout of the page.
/* Params internally used in program:
/*          _isAdd:             If trie, show alternative title, else show title in the header of the page.
/*          _sectionName:       The name of the current section.
/*          _rowIndex:          The index of a selected list element.
/*          _configData:        A pointer to the config data of this page.
/* History: 28-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export type Page = 
{
  title?: string;
  alternative_title?: string;
  sections: PageSection[];
  _isAdd?: boolean;
  _sectionName?: string;
  _rowIndex?: number;
  _configData?: any;
}


/*************************************************************************************************************************************/
/* Purpose: Represents a configuration page section.
/* Params:  name:                   The name of the page section.
/*          type:                   The section type: Menu, form, element list or custom.
/*          title:                  A title for element list sections. Used to show a title above the list of elements, i.e. 'Events'
/*          alternative_title:      An alternative title to be displayed, instead of the title, i.e. 'No events defined, yet'
/*          icon:                   The icon to be shown on the left of a menu entry in menu sections.
/*          link:                   The name of the page which will be displayed, if the menu, the edit button of an list element or
/*                                  a button of a custom section is clicked.
/*          schema:                 The config data schema if the section (forms, element lists or custom)
/*          sortable:               If true, an element list is sortable.
/*          conditionalSchemaField: This is used for schemas with dropdowns and should contain the field name of a drop down, where
/*                                  the schema changes, depending on the selected value from the dropdown.
/* Params internally used in program:
/*          _errors:                A list of errors displayed in a form section when validating the form.
/* History: 28-MAR-2025 D.Geisenhoff   Created
/*************************************************************************************************************************************/
export type PageSection = 
{
  name: string;
  type: "menu" | "form" | "entity" | "element_list" | "custom"
  title?: string;
  alternative_title?: string;
  icon?: string;
  link?: Page;
  schema?: any;
  sortable?: boolean;
  conditionalSchemaField?: string;
  _errors?: Record<string, string>;
}


/*****************************************************************************************************************************/
/* Purpose: Parent class of UI editor class to write easyly configuration interfaces
/* History: 01-APR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export class ConfigFramework extends LitElement implements LovelaceCardEditor
{
  @property({ attribute: false }) public hass!: HomeAssistant;
  private _siteHistory: Page[] = [];
  private _mainPage?: Page;
  private _previousSectionConfigData?: any = undefined;
  private _eventSubscription: any;
  

  /*****************************************************************************************************************************/
  /* Purpose: Set site structure in constructor
  /* History: 22-FEB-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  constructor(mainPage: Page)
  {
    super();
    this._mainPage = mainPage;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Listen to the lovelace_updated event, to know when the user has saved the config.
  /* History: 06-JUN-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  public async connectedCallback() 
  {
    super.connectedCallback();
    try 
    {
      if (this._eventSubscription)
        this._eventSubscription.unsubscribe();
      this._eventSubscription = await this.hass.connection.subscribeEvents(async (event: any) => 
      {
        if (event.event_type === "lovelace_updated") 
        {
          await this.configSaved();
        }
      }, 
      "lovelace_updated"
    );
    } 
    catch (err) 
    {
      console.error("Error while subscribing to the lovelace_updated event:", err);
    }
  }


  /*****************************************************************************************************************************/
  /* Purpose: DOM Destructor
  /* History: 18-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  public disconnectedCallback() 
  {
    super.disconnectedCallback();
    if (this._eventSubscription)
    {
      // Unsubscribe
      this._eventSubscription();
    }
  } 



  /*****************************************************************************************************************************/
  /* Purpose: Called after config-changed event has been fired. Assert config structure and initialize site history
  /* History: 22-FEB-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  public async setConfig(config: any): Promise<void> 
  {
    // assert(config, cardConfigStruct);
    if (this._siteHistory.length == 0)
    {
      if (this._mainPage)
      {
        this._mainPage._configData = config;
        this._siteHistory = [this._mainPage];
      }
    }
    this.requestUpdate();
  }


  /*****************************************************************************************************************************/
  /* Purpose: Called when the user has saved the configuration.
  /* History: 01-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected async configSaved() {}


  /*****************************************************************************************************************************/
  /* Purpose: Called when a form value has changed on the page. Used for setting default values or auto filling other fields.
  /* History: 01-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected valueChanged(_pageName: string, _configData: any, _sectionName: string, _sectionConfigData: any, _previousSectionConfigData: any): any {}


  /*****************************************************************************************************************************/
  /* Purpose: Called when a new list element has been added. Used for setting default values on the page
  /* History: 17-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected listElementAdded(_pageName: string, _configData: any): any  {}


  /*****************************************************************************************************************************/
  /* Purpose: Called before a list element will be removed. Used for comfirmation.
  /* History: 30-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected listElementRemoving(_pageName: string, _configData: any): boolean
  {
    return true;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Validate the form section
  /* History: 07-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected validateForm (_pageName: string, _section: PageSection, _newConfigData: any): boolean 
  {
    return false;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Autofill other fields of current form
  /* History: 01-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected renderCustom(_section: PageSection, _configData: any): any {}



  /*****************************************************************************************************************************/
  /* Purpose: Set current page and sectin when a menu item, a add or edit button has been clicked
  /* History: 22-FEB-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected setCurrentPage(selectedSection: PageSection, rowIndex: number | undefined = undefined, isAdd: boolean | undefined = undefined): void 
  {
    const currentPage = this._getCurrentPage();
    currentPage._sectionName = selectedSection.name;
    const newPage = selectedSection.link!;
    newPage._isAdd = rowIndex === undefined ? undefined : isAdd;
    if (currentPage._rowIndex != undefined)
      newPage._configData = currentPage._configData[currentPage._rowIndex!][selectedSection.name];
    else
      newPage._configData = currentPage._configData[selectedSection.name];
    newPage._rowIndex = rowIndex;
    this._siteHistory.push(newPage);
    this.requestUpdate();
  }


  /*****************************************************************************************************************************/
  /* Purpose: A form value has changed in the form, so update the config. Take the config of the entire page, not the section. 
  /*          This way, the user can change or set values of fields in any section of the page, not only the current one.
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected updateFormValues(pageName: string, section: PageSection, ev: any): void 
  {
    if (!this._mainPage?._configData || !this.hass) 
    {
      return;
    }
    let sectionConfigData = ev.detail.value;
    let pageConfigData;
    let newConfigData;
    const currentPage = this._getCurrentPage();
    if (currentPage._rowIndex != undefined)
    {
      newConfigData =  [...currentPage._configData];
      pageConfigData = {...newConfigData[currentPage._rowIndex]}
    }
    else
    {
      newConfigData =  {...currentPage._configData};
      pageConfigData = newConfigData;
    }
    if (!pageConfigData[section.name])
      pageConfigData[section.name] = {};
    this._previousSectionConfigData = pageConfigData[section.name];
    pageConfigData[section.name] = {...sectionConfigData};
    const isValid = this.validateForm(pageName, section, sectionConfigData)
    if (isValid)
        pageConfigData = this.valueChanged(pageName, pageConfigData, section.name, sectionConfigData, this._previousSectionConfigData)
    if (currentPage._rowIndex != undefined)
        newConfigData[currentPage._rowIndex] = pageConfigData;
    else
        newConfigData = pageConfigData;
    // Always save data, also when the form is invalid
    currentPage._configData = newConfigData;
    const config = this._updateSectionConfigData(undefined, newConfigData);
    fireEvent(this, "config-changed",  {config} );
  }


  /*****************************************************************************************************************************/
  /* Purpose: Generate localized labels for the config forms when overriding
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected localizeText (_text: string) {}


  /*****************************************************************************************************************************/
  /* Purpose: Generate localized labels for the config forms when overriding
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected localizeError (_schema: any) {}


  /*****************************************************************************************************************************/
  /* Purpose: Generate localized labels for the config forms
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected computeLabelCallback = (schema: any) =>
    schema?.label ? schema?.label : this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema?.name}`) || this.localizeText(schema?.name);


  /*****************************************************************************************************************************/
  /* Purpose: Generate localized errors for the config forms
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected computeErrorCallback = (schema: any) =>
     this.localizeError(schema);



  /*****************************************************************************************************************************/
  /* Purpose: Back to previous page
  /* History: 22-FEB-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _goBack(): void 
  {
    this._siteHistory.pop();
    this.requestUpdate();
  }


  /*****************************************************************************************************************************/
  /* Purpose: Get the current page
  /* History: 28-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _getCurrentPage(): Page
  {
    return this._siteHistory[this._siteHistory.length - 1];
  }


  /*****************************************************************************************************************************/
  /* Purpose: Update the changed config data of the current page section into a shallow copy of config
  /* History: 26-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _updateSectionConfigData(sectionName: string | undefined, newConfigData: any): any 
  {
    // Starting from the deepest level, update each parent with a shallow copy.
    let updated = newConfigData;
    let deepestLevel = this._siteHistory.length - 1;
    if (sectionName == undefined)
      deepestLevel -=1;
    for (let i = deepestLevel; i >= 0; i--) 
    {
      let parentClone;
      let parentCloneArrayElement;
      let parentPage = this._siteHistory[i];
      let parentData = parentPage._configData;
      let newSectionName = (i == this._siteHistory.length-1) ? sectionName! : parentPage._sectionName
      if (parentPage._rowIndex != undefined)
      {
        //element of list
        parentClone = [...parentData]; // shallow copy of the array
        parentCloneArrayElement = {...parentClone[parentPage._rowIndex!]};
        parentCloneArrayElement[newSectionName!]=updated;
        parentClone[parentPage._rowIndex!]=parentCloneArrayElement;
      }
      else
      {
        // object
        parentClone = { ...parentData }; // shallow copy of the object
        parentClone[newSectionName!] = updated;
      }
      updated = parentClone;
      parentPage._configData = parentClone;
    }
    return updated;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Get the config data of the current page section
  /* History: 27-MAR-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _getSectionConfigData(section: PageSection): any
  {
    const page = this._getCurrentPage();
    if (!page._configData)
      return undefined;
    if (page._rowIndex != undefined)
      return page._configData[page._rowIndex][section.name];
    else
      return page._configData[section.name];
  }


  /*****************************************************************************************************************************/
  /* Purpose: Fired when an element has been moved, deleted or added.
  /* History: 24-MAR-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  private _elementListChanged(ev: CustomEvent, section: PageSection): void 
  {
    const elementList = ev.detail.elementList;
    const index = ev.detail.index;
    let config;
    switch (ev.detail.change)
    {
      case "add":
        elementList[index] = this.listElementAdded(section.name, elementList[index]);
        config = this._updateSectionConfigData(section.name, elementList);
        fireEvent(this, "config-changed",  {config} );
        this.setCurrentPage(section, index, true)
        break;
      case "edit":
        this.setCurrentPage(section, index, false)
        break;
      case "remove":
        const removeOk: boolean = this.listElementRemoving(section.name,elementList[index]);
        if (removeOk)
        {
          config = this._updateSectionConfigData(section.name, elementList);
          fireEvent(this, "config-changed",  {config} );
        }
        break;
      case "move":
        config = this._updateSectionConfigData(section.name, elementList);
        fireEvent(this, "config-changed",  {config} );
        break;
    }
  }


  /*****************************************************************************************************************************/
  /* Purpose: Render the page header
  /* History: 28-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _renderPageHeader(page: Page): any
  {
    return (page != undefined && page.title != undefined && page.title.trim() != "") ?
    html`
      <microteq-page-header
        @microteq-go-back=${this._goBack}
        pageTitle = ${this.localizeText(`${page._isAdd == undefined || !page._isAdd ? page.title : page.alternative_title}`)}>
      </microteq-page-header>
    `
    : html ``;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Render a menu page section
  /* History: 28-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _renderMenuEntry(section: PageSection): any
  {
    const icon = section.icon ?? "mdi:dots-horizontal-circle-outline";
    const title = section.title ? section.title : section.name;
    return html`
      <microteq-menu-entry
        path=${section.title}
        header="${this.localizeText(`${title}`)}"
        @microteq-menu-click=${() => this.setCurrentPage(section)}
        icon=${icon}>
      </microteq-menu-entry>
    `;
  }


/*****************************************************************************************************************************/
  /* Purpose: Render an entity picker with an edit button
  /* History: 24-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _renderEditableEntity(pageName: string, section: PageSection): any
  {
    const configData = this._getSectionConfigData(section);
    return html`
    <div style="display: flex;">
      <ha-form
        .hass=${this.hass}
        .schema=${section.conditionalSchemaField ? section.schema(configData ? configData[section.conditionalSchemaField] : '') : section.schema}
        .data = ${configData}
        .computeLabel=${this.computeLabelCallback}
        .error=${section._errors}
        .computeError=${this.computeErrorCallback}
        @value-changed=${(ev: CustomEvent) => this.updateFormValues(pageName, section, ev)}>
      </ha-form>
      <ha-icon-button 
        .label=${this.hass!.localize("ui.components.entity.entity-picker.edit")}
        .path=${mdiPencil}
        class="edit-icon"
        @click=${() => this.setCurrentPage(section)}>
      </ha-icon-button>
    </div>
  `;
  }
  

  /*****************************************************************************************************************************/
  /* Purpose: Render a form page section
  /* History: 28-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _renderForm(pageName: string, section: PageSection): any
  {
    const configData = this._getSectionConfigData(section);
    this.validateForm(pageName, section, configData);
    return html`
    <ha-form
      .hass=${this.hass}
      .schema=${section.conditionalSchemaField ? section.schema(configData ? configData[section.conditionalSchemaField] : ""): section.schema}
      .data = ${configData}
      .computeLabel=${this.computeLabelCallback}
      .error=${section._errors}
      .computeError=${this.computeErrorCallback}
      @value-changed=${(ev: CustomEvent) => this.updateFormValues(pageName, section, ev)}>
    </ha-form>
  `;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Render a list of elements page section
  /* History: 28-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _renderElementList(section: PageSection): any
  {
    const elementList: any[] = this._getSectionConfigData(section) || [];
    const listTitle = section.title ? section.title : section.name;

    return html`
      <microteq-element-list
        .hass = ${this.hass}
        .elementList = ${elementList}
        .sortable = ${section.sortable}
        .listTitle = ${this.localizeText(`${listTitle ?? ""}`)}
        .listEmptyText = ${this.localizeText(`${section.alternative_title ?? ""}`)}
        .addNewText = ${this.localizeText(`${section.link!.alternative_title}`)}
        @microteq-element-list-changed=${(ev: CustomEvent) => this._elementListChanged(ev, section)}>
      </microteq-element-list>
    `;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Render a custom page section
  /* History: 28-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _renderCustom(pageName: string, section: PageSection): any
  {
    const configData = this._getSectionConfigData(section);
    this.validateForm(pageName, section, configData);
    return this.renderCustom(section, configData);
  }


  /*****************************************************************************************************************************/
  /* Purpose: Render a page section
  /* History: 22-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  private _renderSection(section: PageSection) : any
  {
    let pageName;
    if (this._siteHistory.length == 1)
      pageName = "";
    else
      pageName = this._siteHistory[this._siteHistory.length-2]._sectionName ?? ""
    switch (section.type)
    {
      case "menu":
        return this._renderMenuEntry(section);
      case "entity":
        return this._renderEditableEntity(pageName, section);
      case "form":
        return this._renderForm(pageName, section);
      case "element_list":
        return this._renderElementList(section);
      case "custom":
        return this._renderCustom(pageName, section);
      default:
    }
    return html``;
  };


  /*****************************************************************************************************************************/
  /* Purpose: Render the page
  /* History: 22-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected render() 
  {
    const currentPage = this._getCurrentPage();
    if (!this.hass || !this._mainPage?._configData || !currentPage)
    {
      return nothing;
    }
    return html `
      <div class="card-config">
        ${this._renderPageHeader(currentPage)}
        ${
          currentPage.sections.map((section: PageSection) =>
          {
            return this._renderSection(section)
          })
        }
      </div>
      `
  }


  /*****************************************************************************************************************************/
  /* Purpose: Styles for this HTML element (UI editor)
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  static get styles() 
  {
    return css`
      ha-form 
      {
        width: 100%;
      }

      ha-icon-button {
        align-self: end;
        padding-bottom: 6px;
      }


      .card-config {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-bottom: 10px;
      }
    
    `;
  }
} 

   
