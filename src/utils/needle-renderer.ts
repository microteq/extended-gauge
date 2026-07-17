import { svg } from "lit";
import { styleMap } from "lit/directives/style-map.js";

export interface NeedleRenderOptions {
  /** Needle style: "default" | "classic" | "icon" */
  needleStyle: string;
  /** Icon name, e.g. "mdi:home" or "hacs:hacs".  Only used when needleStyle="icon". */
  needleIcon?: string;
  /** Resolved SVG path data for the icon.  null while loading or if unavailable. */
  needleIconPath: string | null;
  /** If true, the icon stays upright; otherwise it rotates with the gauge. */
  needleIconKeepVertical: boolean;
  /** Size multiplier: 1 = 7 SVG units (arc radius is 40 units). */
  needleIconSize: number;
  /**
   * Colour for the icon fill.  Must be applied via inline style (not a bare SVG
   * fill="" attribute) so it wins over the `.needle-icon-path` CSS class rule.
   */
  needleIconColor?: string;
  /** Optional background circle colour behind the icon. */
  needleIconBackgroundColor?: string;
  /** Current needle angle in degrees (0° = min/left, 180° = max/right). */
  valueAngle: number;
  /** Whether to apply the transition animation CSS class. */
  animate: boolean;
}

export function renderDefaultNeedle(
  opts: Pick<NeedleRenderOptions, "valueAngle" | "animate">
) {
  const animClass = opts.animate ? "animation" : "";
  return svg`
    <path
      class="needle ${animClass}"
      d="M -25 -2.5 L -47.5 0 L -25 2.5 z"
      style=${styleMap({ transform: `rotate(${opts.valueAngle}deg)` })}>
    </path>
  `;
}

export function renderClassicNeedle(
  opts: Pick<NeedleRenderOptions, "valueAngle" | "animate">
) {
  const animClass = opts.animate ? "animation" : "";
  return svg`
    <path
      class="needle needle-classic ${animClass}"
      d="M -34,-3 L -40,-1 A 1,1,0,0,0,-40,1 L -34,3 A 2,2,0,0,0,-34,-3 Z"
      style=${styleMap({ transform: `rotate(${opts.valueAngle}deg)` })}>
    </path>
  `;
}

export function renderIconNeedle(
  opts: NeedleRenderOptions
): ReturnType<typeof svg> {
  const {
    needleIcon,
    needleIconPath,
    needleIconKeepVertical,
    needleIconSize,
    needleIconColor,
    needleIconBackgroundColor,
    valueAngle,
    animate,
  } = opts;

  // Fall back to default needle when no icon is configured or path not yet loaded.
  if (!needleIcon || !needleIconPath) {
    return renderDefaultNeedle({ valueAngle, animate });
  }

  // foSize = icon size in SVG units.  scale maps the 24×24 viewBox to foSize×foSize.
  const foSize = 7 * needleIconSize;
  const scale = foSize / 24;
  // BUG-1 fix: use inline style so user colour wins over the CSS class fill rule.
  const iconColor = needleIconColor ?? "var(--primary-text-color)";
  const bgRadius = foSize * 0.5;
  const animClass = animate ? "animation" : "";

  if (needleIconKeepVertical) {
    // Position on the arc but keep the icon upright (no gauge rotation).
    const iconAngleRad = (valueAngle * Math.PI) / 180;
    const cx = -40 * Math.cos(iconAngleRad);
    const cy = -40 * Math.sin(iconAngleRad);
    const tx = cx - foSize / 2;
    const ty = cy - foSize / 2;
    return svg`
      <g class="needle needle-icon ${animClass}">
        ${
          needleIconBackgroundColor
            ? svg`<circle cx=${cx} cy=${cy} r=${bgRadius} fill=${needleIconBackgroundColor} class="needle-icon-bg"/>`
            : ``
        }
        <path
          class="needle-icon-path"
          d=${needleIconPath}
          transform="translate(${tx} ${ty}) scale(${scale})"
          style=${styleMap({ fill: iconColor, "pointer-events": "none" })}>
        </path>
      </g>
    `;
  } else {
    // Rotate with the gauge; arc tip is always at (-40, 0) in rotated space.
    const tx = -40 - foSize / 2;
    const ty = -foSize / 2;
    return svg`
      <g
        class="needle needle-icon ${animClass}"
        style=${styleMap({ transform: `rotate(${valueAngle}deg)` })}>
        ${
          needleIconBackgroundColor
            ? svg`<circle cx=${-40} cy=${0} r=${bgRadius} fill=${needleIconBackgroundColor} class="needle-icon-bg"/>`
            : ``
        }
        <path
          class="needle-icon-path"
          d=${needleIconPath}
          transform="translate(${tx} ${ty}) scale(${scale})"
          style=${styleMap({ fill: iconColor, "pointer-events": "none" })}>
        </path>
      </g>
    `;
  }
}

export function renderNeedle(
  opts: NeedleRenderOptions
): ReturnType<typeof svg> {
  switch (opts.needleStyle) {
    case "classic":
      return renderClassicNeedle(opts);
    case "icon":
      return renderIconNeedle(opts);
    case "default":
    default:
      return renderDefaultNeedle(opts);
  }
}
