/*****************************************************************************************************************************/
/* Purpose: Site stucture consisting of pages and page sections. The site structure must be in exact alignment with the config 
/*          data structure of the configuration data. The name of the page must be the same name as the page config data object. 
/*          The name of the page section object must be the same name as the corresponding config data object. If you create a
/*          page section with no data, you can give it any name and just not define a corresponding config data object.
/* History: 27-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import {Page} from "../code/config-framework";
import 
{ 
  mainConfigSchema, 
  segmentSettingsConfigSchema, 
  titleConfigSchema, 
  entitySettingsConfigSchema, 
  entityConfigSchema 
} from "./config-schema";


/*****************************************************************************************************************************/
/* Purpose: Event page
/* History: 26-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
const segmentSettingsPage: Page = 
{
  title: "edit_segment",
  alternative_title: "add_segment",
  sections: 
  [
    {
      name: "title",
      type: "form",
      schema: titleConfigSchema
    },
    {
      name: "settings",
      type: "form",
      schema: segmentSettingsConfigSchema
    },
  ]
}


/*****************************************************************************************************************************/
/* Purpose: Main page
/* History: 26-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const entitySettingsPage: Page = 
{
  title: "entity_settings",
  sections:
  [
    {
      name: "settings",
      type : "form",
      schema: entitySettingsConfigSchema,
    },
  ]
}


/*****************************************************************************************************************************/
/* Purpose: Define the sections of the main page
/* History: 26-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const mainPage: Page = 
{
  sections:
  [
    {
      name: "title",
      type : "form",
      schema: titleConfigSchema,
    },
    {
      name: "entity",
      type : "entity",
      schema: entityConfigSchema,
      link: entitySettingsPage
    },
    {
      name: "main",
      type : "form",
      schema: mainConfigSchema,
    },
    { 
      name: "segment_list",
      type : "element_list",
      title: "segment_list",
      alternative_title: "segment_list_empty",
      sortable: true,
      link: segmentSettingsPage,
    },
  ]
}
