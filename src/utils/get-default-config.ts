/*****************************************************************************************************************************/
/* Purpose: Default configurations
/* History: 20-JUN-2025 D.Geisenhoff  Created
/*****************************************************************************************************************************/
import { HomeAssistant } from "custom-card-helpers";
import { hexToRgb } from "./convertColor";
import { ExtendedGaugeConfigData } from "../config-framework/data/config-data";

export const defaultValues = {
};


/*****************************************************************************************************************************/
/* Purpose: Get default configuration
/* History: 25-FEB-2025 D.Geisenhoff  Created
/*****************************************************************************************************************************/
export function getDefaultConfig(_hass: HomeAssistant): object
{
  const rootStyles = getComputedStyle(document.documentElement);
  const normalColor = hexToRgb(rootStyles.getPropertyValue('--secondary-text-color'));
  const backgroundColor = hexToRgb(rootStyles.getPropertyValue('--primary-background-color'));
  const config: ExtendedGaugeConfigData = { type: `custom:extended-gauge-card` }
  config.main = 
  {
    color_value: normalColor,
    color_background: backgroundColor,
    show_needle: true,
    show_entity_name: true,
    show_min_max_values: true,
    show_segment_labels: true,
  };
  return config;
}
