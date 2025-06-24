import { customElement } from "lit/decorators.js";
import { ConfigFramework, PageSection} from "../config-framework/code/config-framework";
import { hexToRgb } from "../utils/convertColor";
import localize from "../localize/localize";
import { mainPage } from "../config-framework/data/site-structure";


/*****************************************************************************************************************************/
/* Purpose: Assign HTML tag to this class
/* History: 24-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
declare global 
{
  interface HTMLElementTagNameMap 
  {
    "extended-gauge-ui-editor": ExtendedGaugeUiEditor;
  }
}


/*****************************************************************************************************************************/
/* Purpose: Extended gauge editor class
/* History: 22-FEB-2025 D. Geisenhoff   Created
/*****************************************************************************************************************************/
@customElement("extended-gauge-ui-editor")
export class ExtendedGaugeUiEditor extends ConfigFramework
{
  /*****************************************************************************************************************************/
  /* Purpose: Set site structure in constructor
  /* History: 24-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  constructor()
  {
    super(mainPage);
  }


  /*****************************************************************************************************************************/
  /* Purpose: Autofill other fields of current form or set defaults
  /* History: 01-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected override valueChanged(pageName: string, pageConfigData: any, sectionName: string, sectionConfigData: any): any
  {
    switch (pageName)
    {
      // If entity has a unit of measurement, use it
      case "":
        switch (sectionName)
        {
          case "entity":
            const entity = sectionConfigData?.entity;
            if (entity)
            {
              // add unit of measurement, if entity exists
              const stateObj = this.hass.states[entity];
              if (stateObj)
              {
                // add unit of measurement, if entity has one
                const unitOfMeasurement = stateObj.attributes.unit_of_measurement;
                if (!sectionConfigData.settings) 
                  sectionConfigData.settings = {};
                else 
                  sectionConfigData.settings = {...sectionConfigData.settings}
                if (unitOfMeasurement)
                {
                  sectionConfigData.settings.unit_of_measurement = unitOfMeasurement;
                }
                else
                  delete sectionConfigData.settings.unit_of_measurement;
              }
            }
            else
            {
              // remove unit of measurement, if entity is removed
              if (sectionConfigData?.settings?.unit_of_measurement != undefined)
              {
                sectionConfigData.settings = {...sectionConfigData.settings};
                delete sectionConfigData.settings.unit_of_measurement;
              }
            }
            pageConfigData[sectionName] = sectionConfigData;
            break;
        }
        break;
    }
    return pageConfigData
  }


  /*****************************************************************************************************************************/
  /* Purpose: Set defaults for fields of page, when a list element is added to the list
  /* History: 17-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected override listElementAdded(pageName: string, configData: any): any
  {
    let newConfigData = configData;
    switch (pageName)
    {
      // Set default color for segment 
      case "segment_list":
        if (configData.settings == undefined || configData.segment_color == undefined)
        {
          const style = getComputedStyle(this);
          const accentColor = style.getPropertyValue('--accent-color').trim();
          newConfigData = {...configData};
          if (!newConfigData.settings) 
            newConfigData.settings = {};
          else 
            newConfigData.settings = {...newConfigData.settings}
          newConfigData.settings.segment_color = hexToRgb(accentColor);
        }
        break;
    }
    return newConfigData
  }


  /*****************************************************************************************************************************/
  /* Purpose: Validate the form section
  /* History: 07-APR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected override validateForm (pageName: string, section: PageSection, newConfigData: any): boolean 
  {
    section._errors = {};
    switch (pageName)
    {
      case "": // main page
        switch (section.name)
        {
          case "main":
            if (newConfigData?.min_value > newConfigData?.max_value)
            {
              section._errors = { base: "value_lower_greater_than_upper" };
              return false;
            }
            break;
        }
        break;
      case "segment_list": 
        switch (section.name)
        {
          case "settings":
            if (newConfigData?.segment_lower > newConfigData?.segment_upper)
            {
              section._errors = { base: "range_lower_greater_than_upper" };
              return false;
            }
            break;
        }
      break;
    }
    return true;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Generate localized texts for labels, etc.
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected override localizeText = (text: string) =>
    localize(`editor.${text}`);


  /*****************************************************************************************************************************/
  /* Purpose: Generate localized texts for errors
  /* History: 24-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  protected override localizeError = (schema: any) =>
    localize(`error.${schema}`);
}


