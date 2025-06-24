import { LovelaceCardConfig } from "custom-card-helpers";


/*****************************************************************************************************************************/
/* Purpose: Title configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface TitleConfigData
{
  title: string;
}


/*****************************************************************************************************************************/
/* Purpose: Event action configuration data
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface SegmentSettingsConfigData
{
  segment_lower?: number;
  segment_upper?: number;
  segment_color?: any;
  segment_value_replacement?: string;
}


/*****************************************************************************************************************************/
/* Purpose: Event page configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface SegmentPageConfigData
{
  id: number;
  title?: TitleConfigData;
  settings?: SegmentSettingsConfigData;
}


/*****************************************************************************************************************************/
/* Purpose: Sensor details page configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
interface EntitySettingsConfigData
{
  name?: string;
  unit_of_measurement?: string;
  conversion_factor: number;
  decimals?: number;
  thousand_separator?: string;
  decimal_separator?: string;
}

interface EntityPageConfigData
{
  // Field value of main page (custom section special case, because this section has a link to another page, but has also a data field)
  entity? : string;
  // Sections on sensor settings page
  settings?: EntitySettingsConfigData;
}


/*****************************************************************************************************************************/
/* Purpose: General settings configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
interface MainConfigData 
{
  min_value?: number;
  max_value?: number;
  color_value?: any;
  color_background?: any;
  show_needle?: boolean;
  show_entity_name?: boolean;
  show_min_max_values?: boolean;
  show_segment_labels?: boolean;
}


/*****************************************************************************************************************************/
/* Purpose: Config data structure
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface ExtendedGaugeConfigData extends LovelaceCardConfig
{     
  title?: TitleConfigData,
  main?: MainConfigData,
  entity?: EntityPageConfigData,
  segment_list?: SegmentPageConfigData[],
}


