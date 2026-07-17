/*****************************************************************************************************************************/
/* Purpose: Resolve the effective needle/dial/segments visibility flags consumed by the gauge component.
/*          Prioritizes the legacy `show_needle` boolean if explicitly defined, to maintain 100% backward compatibility.
/*          If `show_needle` is not present, falls back to the modern `display_mode` enum.
/* History: 14-JUL-2026 D.Geisenhoff   Created
/*          17-JUL-2026 Copilot        Prioritize show_needle over display_mode for backwards compatibility
/*****************************************************************************************************************************/
import { DisplayMode } from "../config-framework/data/config-data";

export interface ResolvedDisplayMode {
  showNeedle: boolean;
  showDial: boolean;
  showSegments: boolean;
}

export interface DisplayModeConfig {
  display_mode?: DisplayMode;
  show_needle?: boolean;
}

export function resolveDisplayMode(
  config: DisplayModeConfig | undefined
): ResolvedDisplayMode {
  // If the user explicitly has show_needle set, we honor their explicit show_needle toggle.
  // This ensures 100% backward compatibility for configs that still have show_needle defined.
  if (config?.show_needle !== undefined) {
    if (config.show_needle) {
      return { showNeedle: true, showDial: false, showSegments: true };
    } else {
      return { showNeedle: false, showDial: true, showSegments: false };
    }
  }

  const displayMode = config?.display_mode ?? "gauge_and_needle";

  switch (displayMode) {
    case "dial_only":
      return { showNeedle: false, showDial: true, showSegments: false };
    case "dial_and_needle":
      return { showNeedle: true, showDial: true, showSegments: false };
    case "gauge_and_needle":
    default:
      return { showNeedle: true, showDial: false, showSegments: true };
  }
}
