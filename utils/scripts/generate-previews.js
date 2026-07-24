#!/usr/bin/env node
/**
 * generate-previews.js
 *
 * Generates SVG preview images for all Extended Gauge Card configurations.
 * Run with:  node utils/scripts/generate-previews.js
 * Output:    assets/preview-*.svg
 *
 * Gauge coordinate system (matches ha-gauge.ts and gauge.ts):
 *   - Arc: "M -40 0 A 40 40 0 0 1 40 0"  (left=min, right=max, top=mid)
 *   - Angle 0°  = left  (-40, 0)  = minimum value
 *   - Angle 90° = top   (0, -40)  = midpoint
 *   - Angle 180°= right (+40, 0)  = maximum value
 *   - Point on arc at angle θ: x = -40·cos(θ), y = -40·sin(θ)
 *   - Needle rotation: CSS rotate(θdeg) around (0,0)
 *   - Dial fill arc: draw from (-40,0) to the endpoint at pct*180°
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Canvas / layout constants
// ---------------------------------------------------------------------------
const W   = 240;    // SVG canvas width
const H   = 115;    // SVG canvas height
const CX  = 120;    // Gauge pivot X (horizontally centered)
const CY  = 75;     // Gauge pivot Y — balanced: ~28px top padding, ~27px bottom padding
const R   = 40;     // Gauge arc radius

const OUT_DIR = path.resolve(__dirname, '../../assets');

// ---------------------------------------------------------------------------
// Math helpers
// ---------------------------------------------------------------------------
function toRad(deg) { return deg * Math.PI / 180; }
function r2(n)      { return Math.round(n * 100) / 100; }

/**
 * Convert a value in [min,max] to an angle in [0,180] degrees.
 * 0° = left (min), 90° = top (mid), 180° = right (max).
 */
function valueToAngle(value, min, max) {
  return ((value - min) / (max - min)) * 180;
}

/**
 * Return the SVG coordinate of the point on the arc at angle θ degrees.
 * x = -R·cos(θ),  y = -R·sin(θ)
 */
function arcPoint(angleDeg) {
  const a = toRad(angleDeg);
  return { x: r2(-R * Math.cos(a)), y: r2(-R * Math.sin(a)) };
}

/**
 * Build an SVG arc path from the start of the gauge (-40,0) to the point
 * at the given angle.  Used for the dial fill arc.
 *
 * @param {number} angleDeg  Angle in [0,180].  0 → nothing drawn, 180 → full arc.
 * @param {string} color     Stroke color.
 * @param {number} sw        Stroke width (default 14.7 to match gauge arc).
 * @returns {string} SVG <path> element string.
 */
function dialArcPath(angleDeg, color, sw) {
  sw = sw || 14.7;
  if (angleDeg <= 0) return '';
  if (angleDeg >= 180) {
    // Full arc  — same as the background arc
    return `<path d="M -40 0 A ${R} ${R} 0 0 1 40 0" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="butt"/>`;
  }
  const p = arcPoint(angleDeg);
  const large = angleDeg > 180 ? 1 : 0;
  return `<path d="M -40 0 A ${R} ${R} 0 ${large} 1 ${p.x} ${p.y}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="butt"/>`;
}

/**
 * Build an SVG arc path for a segment from pctLo to pctHi.
 *
 * @param {number} pctLo  0–100
 * @param {number} pctHi  0–100
 * @param {string} color
 */
function segmentArcPath(pctLo, pctHi, color) {
  const a1 = valueToAngle(pctLo, 0, 100);
  const a2 = valueToAngle(pctHi, 0, 100);
  const p1 = arcPoint(a1);
  const p2 = arcPoint(a2);
  const large = (a2 - a1) > 180 ? 1 : 0;
  return `<path d="M ${p1.x} ${p1.y} A ${R} ${R} 0 ${large} 1 ${p2.x} ${p2.y}" stroke="${color}" fill="none" stroke-width="15" opacity="0.85"/>`;
}

/**
 * Build an SVG arc path for a segment from raw value lo to hi within [min,max].
 */
function segmentArcPathV(lo, hi, min, max, color) {
  const a1 = valueToAngle(lo, min, max);
  const a2 = valueToAngle(hi, min, max);
  const p1 = arcPoint(a1);
  const p2 = arcPoint(a2);
  const large = (a2 - a1) > 180 ? 1 : 0;
  return `<path d="M ${p1.x} ${p1.y} A ${R} ${R} 0 ${large} 1 ${p2.x} ${p2.y}" stroke="${color}" fill="none" stroke-width="15" opacity="0.85"/>`;
}

// ---------------------------------------------------------------------------
// SVG building blocks
// ---------------------------------------------------------------------------

/** Background arc (the gauge track) */
const BG_ARC = `<path d="M -40 0 A 40 40 0 0 1 40 0" fill="none" stroke="#3a3a3c" stroke-width="14.7" stroke-linecap="butt"/>`;

/** Default needle arrow at angle θ (no rotation = pointing to min/left) */
function defaultNeedle(angleDeg) {
  return `<path d="M -25 -2.5 L -47.5 0 L -25 2.5 z" fill="#e0e0e0" transform="rotate(${angleDeg})"/>`;
}

/** Original HA-style needle at angle θ — path from ha-gauge.ts */
function oldNeedle(angleDeg) {
  return `<path d="M -34,-3 L -40,-1 A 1,1,0,0,0,-40,1 L -34,3 A 2,2,0,0,0,-34,-3 Z" fill="#e0e0e0" stroke="#1c1c1e" stroke-width="1" stroke-linecap="round" opacity="0.8" transform="rotate(${angleDeg})"/>`;
}

/**
 * Value label and min/max axis labels (rendered inside the gauge group).
 * valueLabel: text shown in the centre (e.g. "25%")
 */
function gaugeLabels(valueLabel) {
  return [
    `<text x="0" y="-5" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e0e0e0" font-weight="bold">${valueLabel}</text>`,
    `<text x="-38" y="8" text-anchor="middle" font-family="sans-serif" font-size="5" fill="#e0e0e0" opacity="0.5">0</text>`,
    `<text x="38" y="8" text-anchor="middle" font-family="sans-serif" font-size="5" fill="#e0e0e0" opacity="0.5">100</text>`,
  ].join('\n    ');
}

function gaugeLabelsCustom(valueLabel, minLabel, maxLabel) {
  return [
    `<text x="0" y="-5" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e0e0e0" font-weight="bold">${valueLabel}</text>`,
    `<text x="-38" y="8" text-anchor="middle" font-family="sans-serif" font-size="5" fill="#e0e0e0" opacity="0.5">${minLabel}</text>`,
    `<text x="38" y="8" text-anchor="middle" font-family="sans-serif" font-size="5" fill="#e0e0e0" opacity="0.5">${maxLabel}</text>`,
  ].join('\n    ');
}

/**
 * Wrap gauge content in the standard SVG shell (background rect + centered group).
 */
function svgWrap(innerContent, extraRootContent) {
  extraRootContent = extraRootContent || '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" rx="12" fill="#1c1c1e"/>
  <g transform="translate(${CX}, ${CY})">
    ${innerContent}
  </g>
  ${extraRootContent}
</svg>`;
}

/**
 * Icon needle that stays vertical; icon positioned on the arc at the given angle.
 * Matches gauge.ts: foSize = 7 * sizeMult, bgRadius = foSize * 0.5.
 * The MDI path is on a 24×24 viewBox; scale = foSize/24 maps it into SVG units.
 */
function iconNeedleVertical(angleDeg, iconPath, iconColor, bgColor, sizeMult) {
  sizeMult = sizeMult || 1;
  const foSize   = 7 * sizeMult;            // foreignObject side length in SVG units (matches gauge.ts)
  const scale    = r2(foSize / 24);         // map 24×24 MDI viewBox → foSize × foSize
  const bgR      = r2(foSize * 0.5);
  const a        = toRad(angleDeg);
  const icx      = r2(-R * Math.cos(a));
  const icy      = r2(-R * Math.sin(a));
  const ix       = r2(icx - foSize / 2);
  const iy       = r2(icy - foSize / 2);
  const bg       = bgColor ? `<circle cx="${icx}" cy="${icy}" r="${bgR}" fill="${bgColor}" opacity="0.9"/>` : '';
  return `${bg}<path d="${iconPath}" transform="translate(${ix}, ${iy}) scale(${scale})" fill="${iconColor}"/>`;
}

// ---------------------------------------------------------------------------
// Individual preview generators
// ---------------------------------------------------------------------------

// value=25, min=0, max=100  →  angle=45°
const ANGLE_25 = valueToAngle(25, 0, 100);   // 45
// value=50, min=0, max=100  →  angle=90°
const ANGLE_50 = valueToAngle(50, 0, 100);   // 90
// value=10, min=-20, max=40  →  angle=90°
const ANGLE_CUSTOM = valueToAngle(10, -20, 40); // 90

function previewNeedleDefault() {
  return svgWrap([
    BG_ARC,
    defaultNeedle(ANGLE_25),
    gaugeLabels('25%'),
  ].join('\n    '));
}

function previewNeedleDefaultMid() {
  return svgWrap([
    BG_ARC,
    defaultNeedle(ANGLE_50),
    gaugeLabels('50%'),
  ].join('\n    '));
}

function previewNeedleOld() {
  return svgWrap([
    BG_ARC,
    oldNeedle(ANGLE_25),
    gaugeLabels('25%'),
  ].join('\n    '));
}

function previewNeedleOldMid() {
  return svgWrap([
    BG_ARC,
    oldNeedle(ANGLE_50),
    gaugeLabels('50%'),
  ].join('\n    '));
}

function previewNeedleIconRotate() {
  // Chevron icon rotated with gauge (sizeMult=1 default)
  // Matches gauge.ts: foSize = 7 * sizeMult; foreignObject centered on arc tip (-40, 0)
  const foSize = 7;                       // 7 SVG units at sizeMult=1
  const scale  = r2(foSize / 24);         // map 24×24 MDI viewBox → foSize × foSize
  const foX    = r2(-40 - foSize / 2);    // foreignObject x (centered on arc tip)
  const foY    = r2(-foSize / 2);         // foreignObject y (centered on arc tip)
  const bgR    = r2(foSize * 0.5);
  // mdi:chevron-down approximate path (24×24 viewBox)
  const chevron = 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z';
  const content = `<g transform="rotate(${ANGLE_25})"><circle cx="-40" cy="0" r="${bgR}" fill="#2a5c8f" opacity="0.9"/><path d="${chevron}" transform="translate(${foX}, ${foY}) scale(${scale})" fill="#5bc8ff"/></g>`;
  return svgWrap([BG_ARC, content, gaugeLabels('25%')].join('\n    '));
}

function previewNeedleIconVertical() {
  // Matches gauge.ts keepVertical=true path: foSize = 7 * sizeMult
  const foSize = 7;
  const scale  = r2(foSize / 24);
  const bgR    = r2(foSize * 0.5);
  const a      = toRad(ANGLE_25);
  const cx     = r2(-R * Math.cos(a));
  const cy     = r2(-R * Math.sin(a));
  const ix     = r2(cx - foSize / 2);
  const iy     = r2(cy - foSize / 2);
  const chevron = 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z';
  const content = `<circle cx="${cx}" cy="${cy}" r="${bgR}" fill="#2a5c8f" opacity="0.9"/><path d="${chevron}" transform="translate(${ix}, ${iy}) scale(${scale})" fill="#5bc8ff"/>`;
  return svgWrap([BG_ARC, content, gaugeLabels('25%')].join('\n    '));
}

function previewSegmentsNeedle() {
  // Segments 0–33 green, 70–85 orange; needle at 25% (angle=45°)
  const seg1    = segmentArcPath(0, 33, '#4caf50');
  const seg2    = segmentArcPath(70, 85, '#ff9800');
  const needle  = defaultNeedle(ANGLE_25);
  return svgWrap([BG_ARC, seg1, seg2, needle, gaugeLabels('25%')].join('\n    '));
}

function previewSegmentsLabels() {
  // Segments without needle; segment threshold labels placed at arc boundary points
  const seg1    = segmentArcPath(0, 33, '#4caf50');
  const seg2    = segmentArcPath(70, 85, '#ff9800');
  const dial    = dialArcPath(ANGLE_25, '#4caf50');

  // Threshold label positions: slightly outside the arc (r+10) so they don't overlap
  function labelAt(pct, color, label, rOffset) {
    rOffset = rOffset || 10;
    const a  = toRad(valueToAngle(pct, 0, 100));
    const lx = r2((R + rOffset) * -Math.cos(a) + CX);
    const ly = r2((R + rOffset) * -Math.sin(a) + CY);
    return `<text x="${lx}" y="${ly}" text-anchor="middle" font-family="sans-serif" font-size="6" fill="${color}">${label}</text>`;
  }

  const extraLabels = [
    labelAt(33, '#4caf50', '33'),
    labelAt(70, '#ff9800', '70'),
    labelAt(85, '#ff9800', '85'),
  ].join('\n  ');

  return svgWrap([BG_ARC, seg1, seg2, dial, gaugeLabels('25%')].join('\n    '), extraLabels);
}

function previewCustomRange() {
  // min=-20, max=40, value=10 → 50% → angle=90° → endpoint=(0,-40)
  const dial   = dialArcPath(ANGLE_CUSTOM, '#4caf50');
  const needle = defaultNeedle(ANGLE_CUSTOM);
  return svgWrap([BG_ARC, dial, needle, gaugeLabelsCustom('10°C', '-20', '40')].join('\n    '));
}

function previewNoNeedle() {
  // Dial mode only: value=25% → angle=45° → fill arc to endpoint
  const dial = dialArcPath(ANGLE_25, '#4caf50');
  return svgWrap([BG_ARC, dial, gaugeLabels('25%')].join('\n    '));
}

// ---------------------------------------------------------------------------
// Write all files
// ---------------------------------------------------------------------------
const EXAMPLE_OUT_DIR = path.resolve(__dirname, '../../assets/examples');
if (!fs.existsSync(EXAMPLE_OUT_DIR)) fs.mkdirSync(EXAMPLE_OUT_DIR, { recursive: true });

// ---------------------------------------------------------------------------
// Example renderings (one per docs/examples.md entry)
// ---------------------------------------------------------------------------

// MDI icon paths (24×24 viewBox) used in previews
// mdi:white-balance-sunny  — circle + 8 rays
const MDI_SUN = 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2v-2H2v2zm18 0h2v-2h-2v2zM11 2v2h2V2h-2zm0 18v2h2v-2h-2zM5.99 4.58L4.58 5.99l1.41 1.41 1.41-1.41-1.41-1.41zm12.02 12.02l-1.41 1.41 1.41 1.41 1.41-1.41-1.41-1.41zM5.99 19.42l1.41-1.41-1.41-1.41-1.41 1.41 1.41 1.41zm12.02-12.02L19.42 6l-1.41-1.41-1.41 1.41 1.41 1.41z';
// mdi:arrow-up-bold
const MDI_ARROW_UP = 'M13 20h-2V8l-5.5 5.5-1.42-1.42L12 4.16l7.92 7.92-1.42 1.42L13 8v12z';

/**
 * Helper: threshold labels outside the arc (root-coordinate labels for value-based scale).
 * @param {Array<{val,color,label}>} marks
 * @param {number} min
 * @param {number} max
 * @param {number} rOff  radial offset beyond arc radius (default 10)
 */
function thresholdLabels(marks, min, max, rOff) {
  rOff = rOff || 10;
  return marks.map(({ val, color, label }) => {
    const a  = toRad(valueToAngle(val, min, max));
    const lx = r2((R + rOff) * -Math.cos(a) + CX);
    const ly = r2((R + rOff) * -Math.sin(a) + CY);
    return `<text x="${lx}" y="${ly}" text-anchor="middle" font-family="sans-serif" font-size="6" fill="${color}">${label}</text>`;
  }).join('\n  ');
}

// 1. CPU Temperature  — value 72°C, segments 0-60 green / 60-80 amber / 80-100 red
function exampleCpuTemp() {
  const mn = 0, mx = 100, val = 72;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(0, 60, mn, mx, '#4caf50'),
    segmentArcPathV(60, 80, mn, mx, '#ff9800'),
    segmentArcPathV(80, 100, mn, mx, '#f44336'),
  ];
  return svgWrap([BG_ARC, ...segs, defaultNeedle(angle), gaugeLabelsCustom('72°C', '0', '100')].join('\n    '));
}

// 2. Battery  — value 35%, segments 0-20 red / 20-50 orange / 50-100 green, old needle
function exampleBattery() {
  const mn = 0, mx = 100, val = 35;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(0, 20, mn, mx, '#f44336'),
    segmentArcPathV(20, 50, mn, mx, '#ff9800'),
    segmentArcPathV(50, 100, mn, mx, '#4caf50'),
  ];
  return svgWrap([BG_ARC, ...segs, oldNeedle(angle), gaugeLabels('35%')].join('\n    '));
}

// 3. AQI — value 120, min=0 max=300, default needle, 5 segments, threshold labels
function exampleAqi() {
  const mn = 0, mx = 300, val = 120;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(0, 50, mn, mx, '#00e400'),
    segmentArcPathV(50, 100, mn, mx, '#ffff00'),
    segmentArcPathV(100, 150, mn, mx, '#ff7e00'),
    segmentArcPathV(150, 200, mn, mx, '#ff0000'),
    segmentArcPathV(200, 300, mn, mx, '#8f3f97'),
  ];
  const labels = thresholdLabels([
    { val: 50,  color: '#ffff00', label: '50'  },
    { val: 100, color: '#ff7e00', label: '100' },
    { val: 150, color: '#ff0000', label: '150' },
    { val: 200, color: '#8f3f97', label: '200' },
  ], mn, mx);
  return svgWrap([BG_ARC, ...segs, defaultNeedle(angle), gaugeLabelsCustom('120', '0', '300')].join('\n    '), labels);
}

// 3.b AQI Gradient
function exampleAqiGradient() {
  const mn = 0, mx = 300, val = 120;
  const angle = valueToAngle(val, mn, mx);
  
  const colorStops = [
    { v: 0, r: 0, g: 228, b: 0 },
    { v: 50, r: 255, g: 255, b: 0 },
    { v: 100, r: 255, g: 126, b: 0 },
    { v: 150, r: 255, g: 0, b: 0 },
    { v: 200, r: 143, g: 63, b: 151 },
    { v: 300, r: 143, g: 63, b: 151 }
  ];
  
  let paths = '';
  for (let i = 0; i < 180; i++) {
    const angle1 = i;
    const angle2 = i + 1.5;
    const v = mn + (i / 180) * (mx - mn);
    
    let color = colorStops[0];
    if (v >= colorStops[colorStops.length - 1].v) {
      color = colorStops[colorStops.length - 1];
    } else {
      for (let j = 0; j < colorStops.length - 1; j++) {
        if (v >= colorStops[j].v && v <= colorStops[j+1].v) {
          const t = (v - colorStops[j].v) / (colorStops[j+1].v - colorStops[j].v);
          color = {
            r: Math.round(colorStops[j].r + t * (colorStops[j+1].r - colorStops[j].r)),
            g: Math.round(colorStops[j].g + t * (colorStops[j+1].g - colorStops[j].g)),
            b: Math.round(colorStops[j].b + t * (colorStops[j+1].b - colorStops[j].b))
          };
          break;
        }
      }
    }
    
    const x1 = r2(-40 * Math.cos(angle1 * Math.PI / 180));
    const y1 = r2(-40 * Math.sin(angle1 * Math.PI / 180));
    const x2 = r2(-40 * Math.cos(angle2 * Math.PI / 180));
    const y2 = r2(-40 * Math.sin(angle2 * Math.PI / 180));
    
    paths += '<path d="M ' + x1 + ' ' + y1 + ' A 40 40 0 0 1 ' + x2 + ' ' + y2 + '" fill="none" stroke="rgb(' + color.r + ',' + color.g + ',' + color.b + ')" stroke-width="16" stroke-linecap="butt" />';
  }

  const defs = '<defs><g id="aqi-slices">' + paths + '</g><mask id="aqi-mask" x="-50%" y="-50%" width="200%" height="200%">' + 
    segmentArcPathV(0, 50, mn, mx, "white") +
    segmentArcPathV(50, 100, mn, mx, "white") +
    segmentArcPathV(100, 150, mn, mx, "white") +
    segmentArcPathV(150, 200, mn, mx, "white") +
    segmentArcPathV(200, 300, mn, mx, "white") +
    '</mask></defs>';

  const gradientArc = '<use href="#aqi-slices" mask="url(#aqi-mask)" />';

  const labels = thresholdLabels([
    { val: 50,  color: '#ffff00', label: '50'  },
    { val: 100, color: '#ff7e00', label: '100' },
    { val: 150, color: '#ff0000', label: '150' },
    { val: 200, color: '#8f3f97', label: '200' },
  ], mn, mx);
  
  return svgWrap([defs, BG_ARC, gradientArc, defaultNeedle(angle), gaugeLabelsCustom('120', '0', '300')].join('\n    '), labels);
}


// 4. UV Index — value 7, min=0 max=11, icon needle (sun), 4 segments
function exampleUvIndex() {
  const mn = 0, mx = 11, val = 7;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(0, 3, mn, mx, '#4caf50'),
    segmentArcPathV(3, 6, mn, mx, '#ffeb3b'),
    segmentArcPathV(6, 8, mn, mx, '#ff9800'),
    segmentArcPathV(8, 11, mn, mx, '#f44336'),
  ];
  const needle = iconNeedleVertical(angle, MDI_SUN, '#ffd500', '#3c2800', 1.5);
  return svgWrap([BG_ARC, ...segs, needle, gaugeLabelsCustom('7', '0', '11')].join('\n    '));
}

// 5. Humidity — value 55%, dial only, 3 segments (no needle)
function exampleHumidity() {
  const mn = 0, mx = 100, val = 55;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(0, 40, mn, mx, '#ff9800'),
    segmentArcPathV(40, 60, mn, mx, '#4caf50'),
    segmentArcPathV(60, 100, mn, mx, '#2196f3'),
  ];
  // Dial mode: show the coloured fill arc of the active segment colour
  const dial = dialArcPath(angle, '#4caf50');
  return svgWrap([BG_ARC, ...segs, dial, gaugeLabels('55%')].join('\n    '));
}

// 6. Power W→kW — value 3.2kW, min=0 max=10, old needle + dial arc
function examplePower() {
  const mn = 0, mx = 10, val = 3.2;
  const angle = valueToAngle(val, mn, mx);
  const dial = dialArcPath(angle, '#4caf50');
  return svgWrap([BG_ARC, dial, oldNeedle(angle), gaugeLabelsCustom('3.2 kW', '0', '10')].join('\n    '));
}

// 7. Wind Speed — value 45 km/h, min=0 max=120, icon needle (arrow-up vertical), 3 segments
function exampleWind() {
  const mn = 0, mx = 120, val = 45;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(0, 20, mn, mx, '#4caf50'),
    segmentArcPathV(20, 60, mn, mx, '#ffeb3b'),
    segmentArcPathV(60, 120, mn, mx, '#f44336'),
  ];
  const needle = iconNeedleVertical(angle, MDI_ARROW_UP, '#90caf9', '#0d47a1', 1.5);
  return svgWrap([BG_ARC, ...segs, needle, gaugeLabelsCustom('45 km/h', '0', '120')].join('\n    '));
}

// 8. CO₂ — value 950ppm, min=400 max=2000, default needle, 4 segments, labels
function exampleCo2() {
  const mn = 400, mx = 2000, val = 950;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(400, 800, mn, mx, '#4caf50'),
    segmentArcPathV(800, 1000, mn, mx, '#ffeb3b'),
    segmentArcPathV(1000, 1500, mn, mx, '#ff9800'),
    segmentArcPathV(1500, 2000, mn, mx, '#f44336'),
  ];
  const labels = thresholdLabels([
    { val: 800,  color: '#ffeb3b', label: '800'  },
    { val: 1000, color: '#ff9800', label: '1000' },
    { val: 1500, color: '#f44336', label: '1500' },
  ], mn, mx);
  return svgWrap([BG_ARC, ...segs, defaultNeedle(angle), gaugeLabelsCustom('950 ppm', '400', '2000')].join('\n    '), labels);
}

// 9. Fridge — value 3.5°C, min=-2 max=10, old needle, 3 segments
function exampleFridge() {
  const mn = -2, mx = 10, val = 3.5;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(-2, 1, mn, mx, '#2196f3'),
    segmentArcPathV(1, 5, mn, mx, '#4caf50'),
    segmentArcPathV(5, 10, mn, mx, '#f44336'),
  ];
  return svgWrap([BG_ARC, ...segs, oldNeedle(angle), gaugeLabelsCustom('3.5°C', '-2', '10')].join('\n    '));
}

// 10. Solar — value 2200W, min=0 max=5000, dial only, 3 segments
function exampleSolar() {
  const mn = 0, mx = 5000, val = 2200;
  const angle = valueToAngle(val, mn, mx);
  const segs = [
    segmentArcPathV(0, 1000, mn, mx, '#2196f3'),
    segmentArcPathV(1000, 3000, mn, mx, '#ffeb3b'),
    segmentArcPathV(3000, 5000, mn, mx, '#ff9800'),
  ];
  const dial = dialArcPath(angle, '#ffeb3b');
  return svgWrap([BG_ARC, ...segs, dial, gaugeLabelsCustom('2200 W', '0', '5000')].join('\n    '));
}


const FILES = {
  'preview-needle-default.svg':     previewNeedleDefault(),
  'preview-needle-default-mid.svg': previewNeedleDefaultMid(),
  'preview-needle-old.svg':         previewNeedleOld(),
  'preview-needle-old-mid.svg':     previewNeedleOldMid(),
  'preview-needle-icon-rotate.svg': previewNeedleIconRotate(),
  'preview-needle-icon-vertical.svg': previewNeedleIconVertical(),
  'preview-segments-needle.svg':    previewSegmentsNeedle(),
  'preview-segments-labels.svg':    previewSegmentsLabels(),
  'preview-custom-range.svg':       previewCustomRange(),
  'preview-no-needle.svg':          previewNoNeedle(),
};

for (const [name, content] of Object.entries(FILES)) {
  const filePath = path.join(OUT_DIR, name);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Written:', name);
}
console.log(`\nAll ${Object.keys(FILES).length} previews written to assets/`);

const EXAMPLE_FILES = {
  'cpu-temp.svg':   exampleCpuTemp(),
  'battery.svg':    exampleBattery(),
  'aqi.svg':        exampleAqi(),
  'aqi-gradient.svg': exampleAqiGradient(),
  'uv-index.svg':   exampleUvIndex(),
  'humidity.svg':   exampleHumidity(),
  'power.svg':      examplePower(),
  'wind.svg':       exampleWind(),
  'co2.svg':        exampleCo2(),
  'fridge.svg':     exampleFridge(),
  'solar.svg':      exampleSolar(),
};

for (const [name, content] of Object.entries(EXAMPLE_FILES)) {
  const filePath = path.join(EXAMPLE_OUT_DIR, name);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Written: examples/' + name);
}
console.log(`\nAll ${Object.keys(EXAMPLE_FILES).length} example previews written to assets/examples/`);
