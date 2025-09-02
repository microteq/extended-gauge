import {
  HomeAssistant,
  LovelaceCardEditor,
} from "custom-card-helpers";
import { html, LitElement, PropertyValues, TemplateResult, } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  ExtendedGaugeConfigData,
  SegmentPageConfigData,
  SegmentSettingsConfigData,
} from "./config-framework/data/config-data";
import { styles } from "./style";
import { getDefaultConfig } from "./utils/get-default-config";
import { css } from 'lit';
import { hexToRgb, rgbToHex } from "./utils/convertColor";
import "./components/gauge";
import { DemoTimerManager, GaugeSegment } from "./components/gauge";
import { registerCustomCard } from "./utils/register-custom-card";


/*****************************************************************************************************************************/
/* Purpose: Register the custom card in home assistant
/* History: 18-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
registerCustomCard(
{
  type: "extended-gauge-card",
  name: "Extended Gauge",
  description:
    "Extended Gauge Card with multiple segments.",
});


/*****************************************************************************************************************************/
/* Purpose: Main display element of the custom card (extended gauge card)
/* History: 18-FEB-2025 D. Geisenhoff   Created
/*****************************************************************************************************************************/
@customElement("extended-gauge-card")
export class ExtendedGaugeCard extends LitElement 
{
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config: ExtendedGaugeConfigData = {type: `custom:extended-gauge-card`};
  private _minValue: number = 0;
  private _maxValue: number = 0;
  //public isInEditMode: boolean = false;


  /*****************************************************************************************************************************/
  /* Purpose: Constructor
  /* History: 18-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  public connectedCallback() 
  {
    super.connectedCallback();
    //this.isInEditMode = this.isEditMode()
    // Initialize gauge values
    const value = this._getValue();
    if (this._getValue() != undefined)
    {
      this._minValue = Infinity;
      this._maxValue = -Infinity;
    }
    else
    {
      this._setMinValue(value);
      this._setMaxValue(value);
    }
    // Start demo value timer, if no entity has been selected
    if (this._config.entity?.entity == null)
        DemoTimerManager.registerCallback(this._updateDemoValue);
  }


  /*****************************************************************************************************************************/
  /* Purpose: Called when card unloads from DOM
  /* History: 26-JUN-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  public disconnectedCallback()
  {
    super.disconnectedCallback();
    DemoTimerManager.unregisterCallback(this._updateDemoValue);
  }


  /*****************************************************************************************************************************/
  /* Purpose: The grid options of your card. Home Assistant uses this to set the card size in sections view.
  /* History: 27-JUN-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  getGridOptions() 
  {
    return {
      max_columns: 33, // Standard-Spaltenanzahl
    };
  }


  /*****************************************************************************************************************************/
  /* Purpose: The height of your card. Home Assistant uses this to automatically distribute all cards over the available columns 
  /*          in masonry view.
  /* History: 18-FEB-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  public getCardSize(): Promise<number> | number 
  {
    return 3;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Open the UI editor
  /* History: 18-FEB-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  setConfig(config: ExtendedGaugeConfigData): void 
  {
    this._config = 
    {
      ...config,
    };
  }


  /*****************************************************************************************************************************/
  /* Purpose: Get UI editor
  /* History: 18-FEB-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  public static async getConfigElement(): Promise<LovelaceCardEditor> 
  {
    await import("./ui-editor/ui-editor");
    return document.createElement("extended-gauge-ui-editor");
  }


  /*****************************************************************************************************************************/
  /* Purpose: Get default values for configuration
  /* History: 18-FEB-2025 D. Geisenhoff   Created
  /*****************************************************************************************************************************/
  public static getStubConfig(hass: HomeAssistant): object 
  {
    return getDefaultConfig(hass);
  }
 


  /*****************************************************************************************************************************/
  /* Purpose: Return true if card is in ui edit mode
  /* History: 10-MAR-2025 D.Geisenhoff   Created
  /*****************************************************************************************************************************/
  // private isEditMode() 
  // {
  //   const checkForEditMode = (element) => 
  //   {
  //     // Check current element
  //     if (element.classList && (element.classList.contains('edit-mode') || element.classList.contains('element-preview'))) 
  //     {
  //       return true;
  //     }
  //     // Check parents in mormal DOM
  //     if (element.parentNode) 
  //     {
  //       return checkForEditMode(element.parentNode);
  //     }
  //     // Pass shadow limit
  //     if (element.nodeType === 11 && element.host) 
  //     { 
  //       return checkForEditMode(element.host);
  //     }
  //     // If we are in a shadow root, change to host
  //     if (element.host) 
  //     {
  //       return checkForEditMode(element.host);
  //     }
  //     // Nothing found
  //     return false;
  //   };
  //   return checkForEditMode(this);
  // }


  /*****************************************************************************************************************************/
  /* Purpose: LitElement callback. Called after the element has updated its properties and rendered. It runs each time the 
  /*          component updates, unless the update was prevented. Called after the first render (firstUpdated()) and on every 
  /*          subsequent update
  /* History: 18-FEB-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  protected updated(changedProps: PropertyValues): void 
  {
    super.updated(changedProps);
    if (!this._config || !this.hass) 
    {
      return;
    }
  }


  /*******************************************************************************************************************************/
  /* Purpose: Do not update card while dragging a row
  /* History: 17-FEB-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  protected shouldUpdate(): boolean 
  {
    return true;
  }


  /*******************************************************************************************************************************/
  /* Purpose: If no min value is defined, set min value to the minimum of the current value of the sensor
  /* History: 28-MAR-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  private _setMinValue(value)
  {
    if (this._config.main?.min_value != undefined) 
    {
      this._minValue = this._config.main?.min_value
      return;
    }
    if (!value)
      return;
    else
      this._minValue =  Math.min(value, this._minValue);
  } 


  /*******************************************************************************************************************************/
  /* Purpose: If no max value is defined, set max value to the maximum of the current value of the sensor
  /* History: 28-MAR-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  private _setMaxValue(value)
  {
    if (this._config.main?.max_value != undefined) 
    {
      this._maxValue = this._config.main?.max_value;
      return;  
    }
    if (!value)
      return;
    else
      this._maxValue =  Math.max(value + 0.000001, this._maxValue);
  } 


  /*******************************************************************************************************************************/
  /* Purpose: Get current value of sensor
  /* History: 28-MAR-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  private _getValue(): number | undefined
  {
    let entity;
    if (this._config.entity?.entity && this.hass?.states[this._config.entity?.entity])
      entity = this.hass?.states[this._config.entity?.entity]
    if (!entity)
      return undefined;
    const stringValue = entity.state
    if (stringValue == "unavailable")
      return undefined;
    switch(entity.attributes.device_class)
    {
      case "timestamp":
        return undefined;
      default:
        return this._config.entity?.settings?.conversion_factor == undefined ? parseFloat(stringValue) : parseFloat(stringValue) / this._config.entity?.settings?.conversion_factor;
    }
  }


  /*******************************************************************************************************************************/
  /* Purpose: Show sensor range colors
  /* History: 03-APR-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  private _convertSegments(config: ExtendedGaugeConfigData)
  {
    const segment_list : GaugeSegment[] = [];
    if (config.segment_list)
    {
      for (const segment of config.segment_list)
      {
        segment_list.push(
        {
          lower: segment.settings?.segment_lower!, 
          upper: segment.settings?.segment_upper!, 
          color: rgbToHex(segment.settings?.segment_color),
          valueReplacement: segment.settings?.segment_value_replacement
        });
      }
    }
    return segment_list
  }


  /*******************************************************************************************************************************/
  /* Purpose: Get demo data for showing a gauge, if no entity is selected
  /* History: 16-APR-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  private _getDemoData(): ExtendedGaugeConfigData
  {
    const config = {...this._config};
    if (this._config.main?.min_value != undefined) 
      this._minValue = this._config.main?.min_value
    else
      this._minValue = 0;
    if (this._config.main?.max_value != undefined) 
      this._maxValue = this._config.main?.max_value
    else
      this._maxValue = this._config.entity?.settings?.conversion_factor == undefined ? 100 : 100 / this._config.entity?.settings?.conversion_factor;
    if (this._maxValue <= this._minValue)
      this._maxValue = this._minValue + (this._config.entity?.settings?.conversion_factor == undefined ? 100 : 100 / this._config.entity?.settings?.conversion_factor);
    const rootStyles = getComputedStyle(document.documentElement);
    const segment_list : SegmentPageConfigData[] = [];
    const settings1: SegmentSettingsConfigData = 
    {
      segment_lower: this._config?.segment_list?.[0]?.settings?.segment_lower || this._config?.segment_list?.[0]?.settings?.segment_upper ? this._config?.segment_list?.[0]?.settings?.segment_lower : this._minValue, 
      segment_upper: this._config?.segment_list?.[0]?.settings?.segment_lower || this._config?.segment_list?.[0]?.settings?.segment_upper ? this._config?.segment_list?.[0]?.settings?.segment_upper : this._minValue + (this._maxValue-this._minValue) / 3, 
      segment_color: this._config?.segment_list?.[0]?.settings?.segment_color ? this._config.segment_list[0].settings?.segment_color : hexToRgb(rootStyles.getPropertyValue('--primary-color')),
      segment_value_replacement: this._config?.segment_list?.[0]?.settings?.segment_value_replacement ? this._config?.segment_list?.[0]?.settings?.segment_value_replacement : undefined
    };
    segment_list.push(
      {
        id: 0, 
        settings: settings1
      });
    const settings2: SegmentSettingsConfigData = 
    {
      segment_lower: this._config?.segment_list?.[1]?.settings?.segment_lower || this._config?.segment_list?.[1]?.settings?.segment_upper ? this._config?.segment_list?.[1]?.settings?.segment_lower : this._minValue+(this._maxValue-this._minValue) * 0.7, 
      segment_upper: this._config?.segment_list?.[1]?.settings?.segment_lower || this._config?.segment_list?.[1]?.settings?.segment_upper ? this._config?.segment_list?.[1]?.settings?.segment_upper : this._minValue+(this._maxValue-this._minValue) * 0.85, 
      segment_color: this._config?.segment_list?.[1]?.settings?.segment_color ? this._config.segment_list[1].settings?.segment_color : hexToRgb(rootStyles.getPropertyValue('--accent-color')),
      segment_value_replacement: this._config?.segment_list?.[1]?.settings?.segment_value_replacement ? this._config?.segment_list?.[1]?.settings?.segment_value_replacement : undefined
    };
    segment_list.push(
      {
        id: 1, 
        settings: settings2
      });
    config.segment_list= segment_list;
    return config;
  }


  /*******************************************************************************************************************************/
  /* Purpose: Get random value for showing a demo gauge, if no entity is selected
  /* History: 16-APR-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  private _updateDemoValue = () => 
  {
    DemoTimerManager.demoValue = this._minValue + Math.round((this._maxValue - this._minValue) * Math.random());
    this.requestUpdate();
  }
  
  
  /*******************************************************************************************************************************/
  /* Purpose: Render the frontend card
  /* History: 17-FEB-2025 D.Geisenhoff  Created
  /*******************************************************************************************************************************/
  protected render(): TemplateResult 
  {
    if (!this._config || !this.hass) 
    {
      return html``;
    }
    this.style.setProperty(
      "--clickable-cursor",
      this._config.manual_control ? "pointer" : "default"
    );
    let config: ExtendedGaugeConfigData;
    let value;
    if (this._config.entity?.entity == null || this.hass.states[this._config.entity?.entity] == undefined)
    {
      config = this._getDemoData();
      value = DemoTimerManager.demoValue;
    }
    else
    {
      config = this._config;
      value = this._getValue();
      this._setMinValue(value);
      this._setMaxValue(value);
//      DemoTimerManager.unregisterCallback(this._updateDemoValue);
    }
    return html`
      <ha-card style="text-align: center !important;">
        <h1 class="card-header">${config.title?.title}</h1>
        <div class="card-content-container">
          <microteq-extended-gauge
              .locale=${this.hass.locale}
              min=${this._minValue == Infinity ? -999999999 : this._minValue}
              max=${this._maxValue == -Infinity ? 999999999 : this._maxValue}
              .value=${value == undefined ? "" : value}
              .valueLabel = "${config.main?.show_entity_name ? (config.entity?.settings && config.entity?.settings?.name ? config.entity?.settings?.name : config.entity?.entity) : undefined}"
              .unitOfMeasure = ${config.entity?.settings?.unit_of_measurement ?? ""}
              .showNeedle=${config.main?.show_needle}
              .gaugeInfoColor=${rgbToHex(config.main?.color_value)}
              .gaugeBackgroundColor=${rgbToHex(config.main?.color_background)}
              .segments=${this._convertSegments(config)}
              .showSegmentLabels=${config.main?.show_segment_labels}
              .showMinMax = ${config.main?.show_min_max_values}
              .formatOptions=${
              {
                decimalPlaces: config.entity?.settings?.decimals, 
                decimalSeparator: config?.entity?.settings?.decimal_separator,
                thousandSeparator: config?.entity?.settings?.thousand_separator,
              }}>
          </microteq-extended-gauge>
        </div>        
      </ha-card>
    `;
  }


  /*****************************************************************************************************************************/
  /* Purpose: Styles for this HTML element (MicroteqGauge front end)
  /* History: 19-FEB-2025 D.Geisenhoff  Created
  /*****************************************************************************************************************************/
  static styles = css`
    ${styles}
  `;
}


