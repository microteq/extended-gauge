/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {
  any,
  array,
  assign,
  boolean,
  integer,
  number,
  object,
  optional,
  string,
} from "superstruct";
import memoizeOne from "memoize-one";
import localize from "../../localize/localize";

/*****************************************************************************************************************************/
/* Purpose: Configuration structure of lovelace caed
/* History: 15-APR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
const baseLovelaceCardConfig = object({
  type: string(),
  view_layout: any(),
});

/*****************************************************************************************************************************/
/* Purpose: Configuration structure for the card.
/* History: 23-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const cardConfigStruct = assign(
  baseLovelaceCardConfig,
  object({
    main: object({
      title: optional(string()),
      sensor: optional(string()),
      min_value: optional(number()),
      max_value: optional(number()),
      segment_list: optional(any()),
    }),
  })
);

/*****************************************************************************************************************************/
/* Purpose: Schema for title section HA Form
/* History: 26-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const titleConfigSchema = [
  {
    name: "title",
    selector: { text: {} },
  },
];

/*****************************************************************************************************************************/
/* Purpose: Schema for title section HA Form
/* History: 26-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
// export const titleConfigSchema =
// [
//   {
//     type: "grid",
//     column_min_width: "400px",
//     schema: titleSchema
//   },
// ]

/*****************************************************************************************************************************/
/* Purpose: Schema for the settings section of a HA form for segment settings page
/* History: 016APR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const segmentSettingsConfigSchema = [
  {
    type: "grid",
    column_min_width: "200px",
    schema: [
      {
        name: "segment_lower",
        selector: {
          number: { mode: "box", min: -1000000, max: 1000000, step: 0.01 },
        },
      },
      {
        name: "segment_upper",
        selector: {
          number: { mode: "box", min: -1000000, max: 1000000, step: 0.01 },
        },
      },
      {
        name: "segment_color",
        selector: { color_rgb: {} },
      },
      {
        name: "segment_value_replacement",
        selector: { text: {} },
      },
    ],
  },
];

/*****************************************************************************************************************************/
/* Purpose: Schema for title section HA form of segment page
/* History: 02-APR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const segmentConfigSchema = titleConfigSchema;

/*****************************************************************************************************************************/
/* Purpose: Entity details config schema
/* History: 23-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const entitySettingsConfigSchema = [
  {
    type: "grid",
    column_min_width: "200px",
    schema: [
      {
        name: "name",
        selector: { text: {} },
      },
      {
        name: "unit_of_measurement",
        selector: { text: {} },
      },
      {
        name: "conversion_factor",
        selector: {
          number: { mode: "box", min: -1000000, max: 1000000, step: 0.01 },
        },
      },
      {
        name: "decimals",
        selector: {
          number: { mode: "box", min: -1000000, max: 1000000, step: 0.01 },
        },
      },
      {
        name: "thousand_separator",
        selector: { text: {} },
      },
      {
        name: "decimal_separator",
        selector: { text: {} },
      },
    ],
  },
];

/*****************************************************************************************************************************/
/* Purpose: Sensor entity config Schema
/* History: 07-APR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const entityConfigSchema = [
  {
    name: "entity",
    selector: {
      entity: { filter: { domain: ["sensor", "number", "input_number"] } },
    },
  },
];

/*****************************************************************************************************************************/
/* Purpose: Needle settings config schema
/* History: 12-JUL-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const needleConfigSchema = (needleConfig: any) => {
  const needleStyle = needleConfig?.needle_style;
  const bgEnabled = needleConfig?.needle_icon_background_color_enabled;
  return [
    {
      type: "grid",
      column_min_width: "200px",
      schema: [
        {
          name: "needle_style",
          selector: {
            select: {
              options: [
                {
                  value: "default",
                  label: localize("editor.needle_style_default"),
                },
                {
                  value: "classic",
                  label: localize("editor.needle_style_classic"),
                },
                { value: "icon", label: localize("editor.needle_style_icon") },
              ],
              mode: "dropdown",
            },
          },
        },
        ...(needleStyle === "icon"
          ? [
              {
                name: "needle_icon",
                selector: { icon: {} },
              },
              {
                name: "needle_icon_keep_vertical",
                selector: { boolean: {} },
              },
              {
                name: "needle_icon_size",
                selector: {
                  number: { mode: "box", min: 0.1, max: 10, step: 0.1 },
                },
              },
              {
                name: "needle_icon_color",
                selector: { color_rgb: {} },
              },
              {
                name: "needle_icon_background_color_enabled",
                selector: { boolean: {} },
              },
              ...(bgEnabled
                ? [
                    {
                      name: "needle_icon_background_color",
                      selector: { color_rgb: {} },
                    },
                  ]
                : []),
            ]
          : []),
      ],
    },
  ];
};

/*****************************************************************************************************************************/
/* Purpose: Main page config Schema
/* History: 23-FEB-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const mainConfigSchema = [
  {
    type: "grid",
    column_min_width: "200px",
    schema: [
      {
        name: "min_value",
        selector: {
          number: { mode: "box", min: -1000000, max: 1000000, step: 0.01 },
        },
      },
      {
        name: "max_value",
        selector: {
          number: { mode: "box", min: -1000000, max: 1000000, step: 0.01 },
        },
      },
      {
        name: "color_value",
        selector: { color_rgb: {} },
      },
      {
        name: "color_background",
        selector: { color_rgb: {} },
      },
      {
        name: "display_mode",
        selector: {
          select: {
            options: [
              {
                value: "gauge_and_needle",
                label: localize("editor.display_mode_gauge_and_needle"),
              },
              {
                value: "dial_only",
                label: localize("editor.display_mode_dial_only"),
              },
              {
                value: "dial_and_needle",
                label: localize("editor.display_mode_dial_and_needle"),
              },
            ],
            mode: "dropdown",
          },
        },
      },
      {
        name: "show_entity_name",
        selector: { boolean: {} },
      },
      {
        name: "show_min_max_values",
        selector: { boolean: {} },
      },
      {
        name: "show_segment_labels",
        selector: { boolean: {} },
      },
    ],
  },
];
