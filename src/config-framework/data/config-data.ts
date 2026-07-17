import { LovelaceCardConfig } from "custom-card-helpers";

/*****************************************************************************************************************************/
/* Purpose: Title configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface TitleConfigData {
  title: string;
}

/*****************************************************************************************************************************/
/* Purpose: Event action configuration data
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface SegmentSettingsConfigData {
  segment_lower?: number;
  segment_upper?: number;
  segment_color?: any;
  segment_value_replacement?: string;
}

/*****************************************************************************************************************************/
/* Purpose: Event page configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface SegmentPageConfigData {
  id: number;
  title?: TitleConfigData;
  settings?: SegmentSettingsConfigData;
}

/*****************************************************************************************************************************/
/* Purpose: Sensor details page configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
interface EntitySettingsConfigData {
  name?: string;
  unit_of_measurement?: string;
  conversion_factor: number;
  decimals?: number;
  thousand_separator?: string;
  decimal_separator?: string;
}

interface EntityPageConfigData {
  // Field value of main page (custom section special case, because this section has a link to another page, but has also a data field)
  entity?: string;
  // Sections on sensor settings page
  settings?: EntitySettingsConfigData;
}

/*****************************************************************************************************************************/
/* Purpose: Needle style configuration
/* History: 12-JUL-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export type NeedleStyle = "default" | "classic" | "icon";

/** Controls which gauge elements are rendered.
 *  - gauge_and_needle : full arc with coloured segments + needle
 *  - dial_only        : filled arc indicator, no needle, no segments
 *  - dial_and_needle  : filled arc indicator + needle, no segments
 */
export type DisplayMode = "gauge_and_needle" | "dial_only" | "dial_and_needle";

export interface NeedleConfigData {
  needle_style?: NeedleStyle;
  needle_icon?: string;
  needle_icon_keep_vertical?: boolean;
  needle_icon_size?: number;
  needle_icon_color?: any;
  needle_icon_background_color_enabled?: boolean;
  needle_icon_background_color?: any;
}

/*****************************************************************************************************************************/
/* Purpose: General settings configuration
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
interface MainConfigData {
  min_value?: number;
  max_value?: number;
  color_value?: any;
  color_background?: any;
  display_mode?: DisplayMode;
  /** @deprecated Use `display_mode` instead. Kept for backward compatibility with configs created before `display_mode` was introduced. */
  show_needle?: boolean;
  needle?: NeedleConfigData;
  show_entity_name?: boolean;
  show_min_max_values?: boolean;
  show_segment_labels?: boolean;
}

/*****************************************************************************************************************************/
/* Purpose: Config data structure
/* History: 19-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface ExtendedGaugeConfigData extends LovelaceCardConfig {
  title?: TitleConfigData;
  main?: MainConfigData;
  entity?: EntityPageConfigData;
  segment_list?: SegmentPageConfigData[];
}
