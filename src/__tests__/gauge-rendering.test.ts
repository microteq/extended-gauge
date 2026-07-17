// ---------------------------------------------------------------------------
// Mocks — hoisted; must not reference out-of-scope variables.
// We use a "mock"-prefixed name so Jest allows it inside the factory.
// ---------------------------------------------------------------------------

/** Captures every svg`` template call so tests can inspect the output. */
const mockSvgCalls: Array<{ strings: readonly string[]; values: unknown[] }> =
  [];

jest.mock("lit", () => ({
  css: (s: TemplateStringsArray) => s,
  html: (s: TemplateStringsArray, ...v: unknown[]) => ({
    strings: s,
    values: v,
  }),
  svg: jest.fn((strings: TemplateStringsArray, ...values: unknown[]) => {
    mockSvgCalls.push({ strings: Array.from(strings), values });
    return { strings: Array.from(strings), values };
  }),
  LitElement: class {},
  PropertyValues: Map,
}));

jest.mock("lit/directives/style-map.js", () => ({
  // Return the plain object so tests can inspect styleMap arguments directly.
  styleMap: (s: Record<string, string>) => s,
}));

// ---------------------------------------------------------------------------
// Imports — after mocks
// ---------------------------------------------------------------------------
import {
  normalizeValue,
  getValueInPercentage,
  getAngle,
} from "../utils/gauge-math";
import type { GaugeSegment } from "../components/gauge";
import {
  renderDefaultNeedle,
  renderClassicNeedle,
  renderIconNeedle,
  renderNeedle,
  type NeedleRenderOptions,
} from "../utils/needle-renderer";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function flattenSvgCall({
  strings,
  values,
}: {
  strings: readonly string[];
  values: unknown[];
}): string {
  return strings.reduce(
    (acc: string, part: string, i: number) =>
      acc + part + (i < values.length ? String(values[i]) : ""),
    ""
  );
}

/** Join all captured svg`` calls into one string. */
function allSvgOutput(): string {
  return mockSvgCalls.map(flattenSvgCall).join("\n");
}

/**
 * Check whether any svg`` call contained a styleMap object whose `fill` key
 * equals the given colour.  This is the canonical way to verify BUG-1 is fixed:
 * the fill must go through styleMap (inline style) not a bare fill="" attribute.
 */
function svgCallHasStyleFill(color: string): boolean {
  return mockSvgCalls.some(({ values }) =>
    values.some((v) => {
      if (v && typeof v === "object") {
        const obj = v as Record<string, unknown>;
        return (
          obj["fill"] === color ||
          (obj["fill"] !== undefined && String(obj["fill"]).includes(color))
        );
      }
      return false;
    })
  );
}

/**
 * Check whether any svg`` call contained a styleMap object whose `transform`
 * key includes the given rotation string.
 */
function svgCallHasTransform(transform: string): boolean {
  return mockSvgCalls.some(({ values }) =>
    values.some((v) => {
      if (v && typeof v === "object") {
        const obj = v as Record<string, unknown>;
        return String(obj["transform"] ?? "").includes(transform);
      }
      return false;
    })
  );
}

/** Default options used as a base for icon needle tests. */
const ICON_PATH = "M 0 0 L 24 24 Z";

function iconOpts(
  overrides: Partial<NeedleRenderOptions> = {}
): NeedleRenderOptions {
  return {
    needleStyle: "icon",
    needleIcon: "mdi:home",
    needleIconPath: ICON_PATH,
    needleIconKeepVertical: false,
    needleIconSize: 1,
    needleIconColor: undefined,
    needleIconBackgroundColor: undefined,
    valueAngle: 90,
    animate: true,
    ...overrides,
  };
}

beforeEach(() => {
  mockSvgCalls.length = 0;
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// 1. gauge-math helpers
// ---------------------------------------------------------------------------

describe("gauge-math helpers", () => {
  it("normalizeValue clamps above max", () => {
    expect(normalizeValue(200, 0, 100)).toBe(100);
  });

  it("normalizeValue clamps below min", () => {
    expect(normalizeValue(-5, 0, 100)).toBe(0);
  });

  it("normalizeValue returns value when inside range", () => {
    expect(normalizeValue(50, 0, 100)).toBe(50);
  });

  it("normalizeValue returns 0 for NaN input", () => {
    expect(normalizeValue(NaN, 0, 100)).toBe(0);
  });

  it("getValueInPercentage returns 50 at midpoint", () => {
    expect(getValueInPercentage(50, 0, 100)).toBe(50);
  });

  it("getValueInPercentage returns 0 at min", () => {
    expect(getValueInPercentage(0, 0, 100)).toBe(0);
  });

  it("getValueInPercentage returns 100 at max", () => {
    expect(getValueInPercentage(100, 0, 100)).toBe(100);
  });

  it("getAngle maps midpoint to 90°", () => {
    expect(getAngle(50, 0, 100)).toBe(90);
  });

  it("getAngle maps min to 0°", () => {
    expect(getAngle(0, 0, 100)).toBe(0);
  });

  it("getAngle maps max to 180°", () => {
    expect(getAngle(100, 0, 100)).toBe(180);
  });
});

// ---------------------------------------------------------------------------
// 2. GaugeSegment interface
// ---------------------------------------------------------------------------

describe("GaugeSegment interface", () => {
  it("accepts a minimal segment with only the required color field", () => {
    const seg: GaugeSegment = { color: "#ff0000" };
    expect(seg.color).toBe("#ff0000");
    expect(seg.lower).toBeUndefined();
    expect(seg.upper).toBeUndefined();
  });

  it("accepts a fully-populated segment", () => {
    const seg: GaugeSegment = {
      lower: 0,
      upper: 50,
      color: "#00ff00",
      valueReplacement: "OK",
      valueReplacementOutOfRange: "OUT",
    };
    expect(seg.lower).toBe(0);
    expect(seg.upper).toBe(50);
    expect(seg.valueReplacement).toBe("OK");
    expect(seg.valueReplacementOutOfRange).toBe("OUT");
  });
});

// ---------------------------------------------------------------------------
// 3. renderDefaultNeedle
// ---------------------------------------------------------------------------

describe("renderDefaultNeedle", () => {
  it("renders the default arrow path (M -25 -2.5 … z)", () => {
    renderDefaultNeedle({ valueAngle: 90, animate: false });
    expect(allSvgOutput()).toContain("M -25 -2.5");
  });

  it("adds the 'needle' CSS class", () => {
    renderDefaultNeedle({ valueAngle: 90, animate: false });
    expect(allSvgOutput()).toContain("needle");
  });

  it("includes 'animation' class when animate=true", () => {
    renderDefaultNeedle({ valueAngle: 90, animate: true });
    expect(allSvgOutput()).toContain("animation");
  });

  it("omits 'animation' class when animate=false", () => {
    renderDefaultNeedle({ valueAngle: 90, animate: false });
    expect(allSvgOutput()).not.toContain("animation");
  });

  it("applies a rotate transform at the given angle", () => {
    renderDefaultNeedle({ valueAngle: 45, animate: false });
    expect(svgCallHasTransform("rotate(45deg)")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 4. renderClassicNeedle
// ---------------------------------------------------------------------------

describe("renderClassicNeedle", () => {
  it("renders the classic HA needle path (M -34,-3 …)", () => {
    renderClassicNeedle({ valueAngle: 90, animate: false });
    expect(allSvgOutput()).toContain("M -34,-3");
  });

  it("adds the 'needle-classic' CSS class", () => {
    renderClassicNeedle({ valueAngle: 90, animate: false });
    expect(allSvgOutput()).toContain("needle-classic");
  });

  it("includes 'animation' class when animate=true", () => {
    renderClassicNeedle({ valueAngle: 90, animate: true });
    expect(allSvgOutput()).toContain("animation");
  });

  it("omits 'animation' class when animate=false", () => {
    renderClassicNeedle({ valueAngle: 90, animate: false });
    expect(allSvgOutput()).not.toContain("animation");
  });

  it("applies a rotate transform at the given angle", () => {
    renderClassicNeedle({ valueAngle: 120, animate: false });
    expect(svgCallHasTransform("rotate(120deg)")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// 5. renderIconNeedle — fallback cases
// ---------------------------------------------------------------------------

describe("renderIconNeedle – fallback to default needle", () => {
  it("shows default needle when needleIcon is undefined", () => {
    renderIconNeedle(iconOpts({ needleIcon: undefined, needleIconPath: null }));
    expect(allSvgOutput()).toContain("M -25 -2.5");
  });

  it("shows default needle while icon path is still loading (path=null)", () => {
    renderIconNeedle(
      iconOpts({ needleIcon: "mdi:home", needleIconPath: null })
    );
    expect(allSvgOutput()).toContain("M -25 -2.5");
  });

  it("does NOT render 'needle-icon' class when falling back", () => {
    renderIconNeedle(
      iconOpts({ needleIcon: "mdi:home", needleIconPath: null })
    );
    expect(allSvgOutput()).not.toContain("needle-icon");
  });

  it("falls back even for non-MDI icon sets (hacs:hacs) when path not resolved", () => {
    renderIconNeedle(
      iconOpts({ needleIcon: "hacs:hacs", needleIconPath: null })
    );
    expect(allSvgOutput()).toContain("M -25 -2.5");
  });
});

// ---------------------------------------------------------------------------
// 6. renderIconNeedle — resolved path
// ---------------------------------------------------------------------------

describe("renderIconNeedle – path resolved", () => {
  it("renders the resolved icon SVG path data", () => {
    renderIconNeedle(iconOpts());
    expect(allSvgOutput()).toContain(ICON_PATH);
  });

  it("includes the 'needle-icon' CSS class", () => {
    renderIconNeedle(iconOpts());
    expect(allSvgOutput()).toContain("needle-icon");
  });

  // -------------------------------------------------------------------------
  // BUG-1: Icon colour regression test
  //
  // The `.needle-icon-path` CSS class rule has higher specificity than an SVG
  // presentation attribute `fill="…"`.  So `<path fill="#ff0000">` is silently
  // ignored when the class is present.
  //
  // Fix: pass the colour via styleMap (inline style).  Inline styles always win
  // over class rules.  The test checks that the colour ends up in a styleMap
  // object (keyed as "fill"), not only as a loose string in the template.
  // -------------------------------------------------------------------------

  it("BUG-1: applies needleIconColor via styleMap (inline style) so the CSS class does not override it", () => {
    renderIconNeedle(iconOpts({ needleIconColor: "#ff0000" }));
    // The colour must be passed through styleMap (inline style = fill key in object),
    // not only as a bare SVG presentation attribute `fill="..."`.
    // styleMap returns a plain object so allSvgOutput() shows "[object Object]";
    // we inspect the raw values arrays directly.
    expect(svgCallHasStyleFill("#ff0000")).toBe(true);
  });

  it("BUG-1: applies a custom colour for non-MDI icons (hacs:hacs) via styleMap", () => {
    renderIconNeedle(
      iconOpts({ needleIcon: "hacs:hacs", needleIconColor: "#abcdef" })
    );
    expect(svgCallHasStyleFill("#abcdef")).toBe(true);
  });

  it("falls back to var(--primary-text-color) when needleIconColor is undefined", () => {
    renderIconNeedle(iconOpts({ needleIconColor: undefined }));
    expect(svgCallHasStyleFill("var(--primary-text-color)")).toBe(true);
  });

  it("renders a background circle when needleIconBackgroundColor is set", () => {
    renderIconNeedle(iconOpts({ needleIconBackgroundColor: "#0000ff" }));
    expect(allSvgOutput()).toContain("needle-icon-bg");
    expect(allSvgOutput()).toContain("#0000ff");
  });

  it("does NOT render a background circle when needleIconBackgroundColor is undefined", () => {
    renderIconNeedle(iconOpts({ needleIconBackgroundColor: undefined }));
    expect(allSvgOutput()).not.toContain("needle-icon-bg");
  });

  it("includes the 'animation' class when animate=true", () => {
    renderIconNeedle(iconOpts({ animate: true }));
    expect(allSvgOutput()).toContain("animation");
  });

  it("omits the 'animation' class when animate=false", () => {
    renderIconNeedle(iconOpts({ animate: false }));
    expect(allSvgOutput()).not.toContain("animation");
  });

  // -------------------------------------------------------------------------
  // Rotating mode (keepVertical=false)
  // -------------------------------------------------------------------------

  describe("rotating mode (keepVertical=false)", () => {
    it("applies rotate transform to the container group", () => {
      renderIconNeedle(
        iconOpts({ needleIconKeepVertical: false, valueAngle: 90 })
      );
      expect(svgCallHasTransform("rotate(90deg)")).toBe(true);
    });

    it("scales the icon path by needleIconSize (size=2 → 14/24)", () => {
      renderIconNeedle(
        iconOpts({ needleIconKeepVertical: false, needleIconSize: 2 })
      );
      expect(allSvgOutput()).toContain(`scale(${(7 * 2) / 24})`);
    });

    it("uses default scale 7/24 when needleIconSize=1", () => {
      renderIconNeedle(
        iconOpts({ needleIconKeepVertical: false, needleIconSize: 1 })
      );
      expect(allSvgOutput()).toContain(`scale(${7 / 24})`);
    });

    it("translate positions the icon at (-40 – foSize/2, -foSize/2)", () => {
      renderIconNeedle(
        iconOpts({
          needleIconKeepVertical: false,
          needleIconSize: 1,
          valueAngle: 90,
        })
      );
      const foSize = 7;
      const tx = -40 - foSize / 2;
      const ty = -foSize / 2;
      expect(allSvgOutput()).toContain(`translate(${tx} ${ty})`);
    });
  });

  // -------------------------------------------------------------------------
  // keepVertical mode (keepVertical=true)
  // -------------------------------------------------------------------------

  describe("keepVertical mode (keepVertical=true)", () => {
    it("does NOT apply a rotate transform to the container group", () => {
      renderIconNeedle(
        iconOpts({ needleIconKeepVertical: true, valueAngle: 90 })
      );
      expect(svgCallHasTransform("rotate(90deg)")).toBe(false);
    });

    it("positions the icon using cos/sin of valueAngle (90° → top of arc)", () => {
      const angle = 90;
      renderIconNeedle(
        iconOpts({
          needleIconKeepVertical: true,
          valueAngle: angle,
          needleIconSize: 1,
        })
      );
      const rad = (angle * Math.PI) / 180;
      const foSize = 7;
      const cx = -40 * Math.cos(rad);
      const cy = -40 * Math.sin(rad);
      const tx = cx - foSize / 2;
      const ty = cy - foSize / 2;
      expect(allSvgOutput()).toContain(`translate(${tx} ${ty})`);
    });

    it("positions correctly at angle=0 (leftmost, value=min)", () => {
      renderIconNeedle(
        iconOpts({
          needleIconKeepVertical: true,
          valueAngle: 0,
          needleIconSize: 1,
        })
      );
      const foSize = 7;
      const cx = -40 * Math.cos(0); // -40
      const cy = -40 * Math.sin(0); // 0
      const tx = cx - foSize / 2;
      const ty = cy - foSize / 2;
      expect(allSvgOutput()).toContain(`translate(${tx} ${ty})`);
    });

    it("positions correctly at angle=180 (rightmost, value=max)", () => {
      renderIconNeedle(
        iconOpts({
          needleIconKeepVertical: true,
          valueAngle: 180,
          needleIconSize: 1,
        })
      );
      const foSize = 7;
      const cx = -40 * Math.cos(Math.PI); // ≈ 40
      const cy = -40 * Math.sin(Math.PI); // ≈ 0
      const tx = cx - foSize / 2;
      const ty = cy - foSize / 2;
      expect(allSvgOutput()).toContain(`translate(${tx} ${ty})`);
    });

    it("scales by needleIconSize in keepVertical mode", () => {
      renderIconNeedle(
        iconOpts({ needleIconKeepVertical: true, needleIconSize: 3 })
      );
      expect(allSvgOutput()).toContain(`scale(${(7 * 3) / 24})`);
    });
  });
});

// ---------------------------------------------------------------------------
// 7. renderNeedle dispatch
// ---------------------------------------------------------------------------

describe("renderNeedle dispatch", () => {
  it("dispatches to default needle for needleStyle='default'", () => {
    renderNeedle({
      needleStyle: "default",
      valueAngle: 0,
      animate: false,
      needleIconPath: null,
      needleIcon: undefined,
      needleIconKeepVertical: false,
      needleIconSize: 1,
    });
    expect(allSvgOutput()).toContain("M -25 -2.5");
  });

  it("dispatches to classic needle for needleStyle='classic'", () => {
    renderNeedle({
      needleStyle: "classic",
      valueAngle: 0,
      animate: false,
      needleIconPath: null,
      needleIcon: undefined,
      needleIconKeepVertical: false,
      needleIconSize: 1,
    });
    expect(allSvgOutput()).toContain("M -34,-3");
  });

  it("dispatches to icon needle for needleStyle='icon'", () => {
    renderNeedle(iconOpts({ needleStyle: "icon" }));
    expect(allSvgOutput()).toContain("needle-icon");
  });

  it("falls back to default needle for an unknown needleStyle", () => {
    renderNeedle({
      needleStyle: "unknown",
      valueAngle: 0,
      animate: false,
      needleIconPath: null,
      needleIcon: undefined,
      needleIconKeepVertical: false,
      needleIconSize: 1,
    });
    expect(allSvgOutput()).toContain("M -25 -2.5");
  });
});

// ---------------------------------------------------------------------------
// 8. showNeedle / showDial / showSegments independence
// ---------------------------------------------------------------------------
//
// showSegments is resolved by resolveDisplayMode() from the display mode /
// legacy show_needle config (see resolve-display-mode.test.ts) and passed
// into the gauge as its own property, independent of showDial:
//   showSegments → whether the coloured segment bands are drawn, and whether
//                   the flat dial fill is coloured to match the segment the
//                   value falls into (when segments are configured but not
//                   shown as bands)
//   showDial     → whether the filled dial arc is shown
//
// Any combination of the flags must be valid.

/**
 * Reproduces the gauge render() logic for computing display state.
 *
 * IMPORTANT: This is a deliberate, standalone reimplementation of the
 * showNeedle/showDial/showSegments branching logic found in gauge.ts
 * ExtendedGauge.render(). It is NOT a call into the real component, because
 * gauge.ts uses Lit decorators that cannot run in Node.
 *
 * Consequence: these tests verify the *intended* behaviour. If the logic in
 * gauge.ts is changed you MUST update this helper to match, otherwise the
 * tests will silently diverge.
 */
function deriveGaugeState(opts: {
  showNeedle: boolean;
  showDial: boolean;
  showSegments: boolean;
  segments?: { lower: number; upper: number; color: string }[];
  value: number;
  gaugeInfoColor: string;
}) {
  const {
    showNeedle,
    showDial,
    showSegments,
    segments,
    gaugeInfoColor,
    value,
  } = opts;

  let gaugeValueColor = gaugeInfoColor;
  if (segments && !showSegments) {
    segments
      .slice()
      .sort((a, b) => a.lower - b.lower)
      .forEach((segment) => {
        if (value >= segment.lower && value <= segment.upper) {
          gaugeValueColor = segment.color;
        }
      });
  }

  return {
    gaugeValueColor,
    dialVisible: showDial,
    needleVisible: showNeedle,
    segmentsVisible: !!segments && showSegments,
  };
}

describe("showNeedle / showDial / showSegments independence", () => {
  const SEG = [{ lower: 0, upper: 100, color: "#00ff00" }];

  it("showNeedle=true + showDial=true + showSegments=true → needle ✓, dial ✓, segments ✓", () => {
    const s = deriveGaugeState({
      showNeedle: true,
      showDial: true,
      showSegments: true,
      segments: SEG,
      value: 50,
      gaugeInfoColor: "#aaa",
    });
    expect(s.needleVisible).toBe(true);
    expect(s.dialVisible).toBe(true);
    expect(s.segmentsVisible).toBe(true);
  });

  it("showNeedle=true + showDial=false + showSegments=true → needle ✓, dial ✗ (showDial false), segments ✓", () => {
    const s = deriveGaugeState({
      showNeedle: true,
      showDial: false,
      showSegments: true,
      segments: SEG,
      value: 50,
      gaugeInfoColor: "#aaa",
    });
    expect(s.needleVisible).toBe(true);
    expect(s.dialVisible).toBe(false);
    expect(s.segmentsVisible).toBe(true);
  });

  it("showNeedle=false + showDial=true + showSegments=false → needle ✗, dial ✓ (flat fill, backward compatible), segments ✗", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: true,
      showSegments: false,
      segments: SEG,
      value: 50,
      gaugeInfoColor: "#aaa",
    });
    expect(s.needleVisible).toBe(false);
    expect(s.dialVisible).toBe(true);
    expect(s.segmentsVisible).toBe(false);
    expect(s.gaugeValueColor).toBe("#00ff00");
  });

  it("showNeedle=false + showDial=false + showSegments=false → needle ✗, dial ✗ (showDial false), segments ✗", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: false,
      showSegments: false,
      segments: SEG,
      value: 50,
      gaugeInfoColor: "#aaa",
    });
    expect(s.needleVisible).toBe(false);
    expect(s.dialVisible).toBe(false);
    expect(s.segmentsVisible).toBe(false);
  });

  it("no segments + showSegments=false → gaugeInfoColor kept, no segments", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: true,
      showSegments: false,
      segments: undefined,
      value: 50,
      gaugeInfoColor: "#aaa",
    });
    expect(s.gaugeValueColor).toBe("#aaa");
    expect(s.segmentsVisible).toBe(false);
    expect(s.dialVisible).toBe(true);
  });

  it("no segments + showSegments=true → gaugeInfoColor kept, no segments (nothing to draw)", () => {
    const s = deriveGaugeState({
      showNeedle: true,
      showDial: true,
      showSegments: true,
      segments: undefined,
      value: 50,
      gaugeInfoColor: "#bbb",
    });
    expect(s.needleVisible).toBe(true);
    expect(s.segmentsVisible).toBe(false);
    expect(s.gaugeValueColor).toBe("#bbb");
  });

  // ---------------------------------------------------------------------
  // Backward compatibility: dial_only / show_needle: false configs with a
  // negative min_value keep showing the flat, value-reactive dial fill
  // coloured to match whichever segment the value falls into - exactly as
  // legacy YAML configs (created before display_mode existed) always did.
  // ---------------------------------------------------------------------
  it("dial_only-style config (showNeedle=false, showSegments=false) with negative-min segments keeps the flat, value-reactive fill", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: true,
      showSegments: false,
      segments: [
        { lower: -10, upper: -1, color: "#03a9f4" }, // Cold
        { lower: 1, upper: 10, color: "#ff9800" }, // Warm
      ],
      value: 5,
      gaugeInfoColor: "#aaa",
    });
    expect(s.dialVisible).toBe(true);
    expect(s.segmentsVisible).toBe(false);
    expect(s.gaugeValueColor).toBe("#ff9800");
  });

  // ---------------------------------------------------------------------
  // Flat-fill segment colour-matching coverage: this logic must keep working
  // for out-of-range values, exact bounds, and overlapping segments.
  // ---------------------------------------------------------------------
  const FLAT_FILL_SEGMENTS = [
    { lower: 0, upper: 50, color: "#03a9f4" },
    { lower: 50, upper: 100, color: "#ff9800" },
  ];

  it("flat-fill: value outside all segment ranges keeps gaugeInfoColor", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: true,
      showSegments: false,
      segments: FLAT_FILL_SEGMENTS,
      value: 200,
      gaugeInfoColor: "#aaa",
    });
    expect(s.gaugeValueColor).toBe("#aaa");
  });

  it("flat-fill: value at exact lower bound of a segment matches the segment starting there (last match wins on boundary overlap)", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: true,
      showSegments: false,
      segments: FLAT_FILL_SEGMENTS,
      value: 50,
      gaugeInfoColor: "#aaa",
    });
    expect(s.gaugeValueColor).toBe("#ff9800");
  });

  it("flat-fill: value at exact upper bound of a segment matches that segment", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: true,
      showSegments: false,
      segments: FLAT_FILL_SEGMENTS,
      value: 100,
      gaugeInfoColor: "#aaa",
    });
    expect(s.gaugeValueColor).toBe("#ff9800");
  });

  it("flat-fill: multiple overlapping segments, last matching (highest lower bound) segment wins", () => {
    const s = deriveGaugeState({
      showNeedle: false,
      showDial: true,
      showSegments: false,
      segments: [
        { lower: 0, upper: 100, color: "#03a9f4" },
        { lower: 25, upper: 75, color: "#ff9800" },
      ],
      value: 50,
      gaugeInfoColor: "#aaa",
    });
    expect(s.gaugeValueColor).toBe("#ff9800");
  });

  it("dial_and_needle-style config (showNeedle=true, showSegments=false) with negative-min segments: dial fill and needle both visible, no bands", () => {
    const s = deriveGaugeState({
      showNeedle: true,
      showDial: true,
      showSegments: false,
      segments: [
        { lower: -10, upper: -1, color: "#03a9f4" },
        { lower: 1, upper: 10, color: "#ff9800" },
      ],
      value: 5,
      gaugeInfoColor: "#aaa",
    });
    expect(s.needleVisible).toBe(true);
    expect(s.dialVisible).toBe(true);
    expect(s.segmentsVisible).toBe(false);
    expect(s.gaugeValueColor).toBe("#ff9800");
  });
});
