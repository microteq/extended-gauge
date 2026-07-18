/*****************************************************************************************************************************/
/* Purpose: Tests for normalizeSegments utility (src/utils/normalize-segments.ts)
/*
/*          These tests specifically cover the bug where _convertSegments previously
/*          defaulted unset segment_lower / segment_upper to 0 instead of undefined,
/*          which broke segment rendering whenever min_value was negative.
/*
/* History: 16-JUL-2025 Created
/*****************************************************************************************************************************/

// gauge.ts imports LitElement / decorators — stub the minimum needed.
jest.mock("lit", () => ({
  css: (s: TemplateStringsArray) => s,
  html: (s: TemplateStringsArray, ...v: unknown[]) => ({
    strings: s,
    values: v,
  }),
  svg: (s: TemplateStringsArray, ...v: unknown[]) => ({
    strings: s,
    values: v,
  }),
  LitElement: class {},
  PropertyValues: Map,
}));
jest.mock("lit/directives/style-map.js", () => ({
  styleMap: (s: object) => s,
}));
jest.mock("lit-element", () => ({
  customElement: () => () => {},
  property: () => () => {},
  query: () => () => {},
  state: () => () => {},
}));
jest.mock("custom-card-helpers", () => ({}));
jest.mock("../utils/get-icon-svg-path", () => ({ getIconSvgPath: jest.fn() }));
jest.mock("../utils/needle-renderer", () => ({ renderNeedle: jest.fn() }));

import { normalizeSegments } from "../utils/normalize-segments";
import type { GaugeSegment } from "../components/gauge";

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function seg(lower?: number, upper?: number): GaugeSegment {
  return { lower, upper, color: "#ff0000" };
}

// ---------------------------------------------------------------------------
// Basic normalisation
// ---------------------------------------------------------------------------

describe("normalizeSegments – basic behaviour", () => {
  it("fills undefined lower with min", () => {
    const segments = [seg(undefined, 50)];
    normalizeSegments(segments, 0, 100);
    expect(segments[0].lower).toBe(0);
    expect(segments[0].upper).toBe(50);
  });

  it("fills undefined upper with max", () => {
    const segments = [seg(10, undefined)];
    normalizeSegments(segments, 0, 100);
    expect(segments[0].lower).toBe(10);
    expect(segments[0].upper).toBe(100);
  });

  it("fills both undefined lower and upper with min and max", () => {
    const segments = [seg(undefined, undefined)];
    normalizeSegments(segments, 0, 100);
    expect(segments[0].lower).toBe(0);
    expect(segments[0].upper).toBe(100);
  });

  it("preserves an explicit lower of 0 (does not replace it with min)", () => {
    const segments = [seg(0, 50)];
    normalizeSegments(segments, -10, 100);
    // 0 is a valid number – isNaN(0) is false, so it must NOT be overwritten
    expect(segments[0].lower).toBe(0);
  });

  it("preserves an explicit upper of 0 (does not replace it with max)", () => {
    const segments = [seg(-5, 0)];
    normalizeSegments(segments, -10, 10);
    expect(segments[0].upper).toBe(0);
  });

  it("collapses a segment when lower > upper (sets lower = upper)", () => {
    const segments = [seg(80, 20)];
    normalizeSegments(segments, 0, 100);
    expect(segments[0].lower).toBe(20);
    expect(segments[0].upper).toBe(20);
  });

  it("does not modify a segment that is already fully within range", () => {
    const segments = [seg(20, 80)];
    normalizeSegments(segments, 0, 100);
    expect(segments[0].lower).toBe(20);
    expect(segments[0].upper).toBe(80);
  });
});

// ---------------------------------------------------------------------------
// Negative min_value – the bug scenario from issue #12
// ---------------------------------------------------------------------------

describe("normalizeSegments – negative min_value (bug scenario)", () => {
  //
  // Config:  min=-10, max=10
  //   segment A: { segment_lower: 1 }   – upper unset → should span 1 … 10
  //   segment B: { segment_upper: -1 }  – lower unset → should span -10 … -1
  //
  // BEFORE the fix _convertSegments defaulted to 0, producing:
  //   segment A: { lower: 1, upper: 0 }  → collapsed (lower > upper → lower = 0)
  //   segment B: { lower: 0, upper: -1 } → collapsed (lower > upper → lower = -1)

  it("segment with only lower set spans from lower to max", () => {
    const segments = [seg(1, undefined)]; // segment_upper was unset → undefined
    normalizeSegments(segments, -10, 10);
    expect(segments[0].lower).toBe(1);
    expect(segments[0].upper).toBe(10);
  });

  it("segment with only upper set spans from min to upper", () => {
    const segments = [seg(undefined, -1)]; // segment_lower was unset → undefined
    normalizeSegments(segments, -10, 10);
    expect(segments[0].lower).toBe(-10);
    expect(segments[0].upper).toBe(-1);
  });

  it("segment with lower=0 (not a default) is preserved when min is negative", () => {
    // An explicit lower of 0 must not be treated as 'unset'.
    const segments = [seg(0, 5)];
    normalizeSegments(segments, -10, 10);
    expect(segments[0].lower).toBe(0);
    expect(segments[0].upper).toBe(5);
  });

  it("regression: old default of 0 for upper would have collapsed lower=1", () => {
    // Simulate what happened BEFORE the fix:
    // _convertSegments set upper to 0 when unset.
    const segmentWithOldDefault = [seg(1, 0)]; // old broken default
    normalizeSegments(segmentWithOldDefault, -10, 10);
    // lower > upper → lower gets collapsed to upper (= 0); segment is zero-width
    expect(segmentWithOldDefault[0].lower).toBe(0);
    expect(segmentWithOldDefault[0].upper).toBe(0);
    // Contrast with the fixed behaviour:
    const segmentFixed = [seg(1, undefined)]; // correct: undefined upper
    normalizeSegments(segmentFixed, -10, 10);
    expect(segmentFixed[0].lower).toBe(1);
    expect(segmentFixed[0].upper).toBe(10); // correctly spans to max
  });

  it("normalises multiple segments independently", () => {
    const segments = [seg(1, undefined), seg(undefined, -1)];
    normalizeSegments(segments, -10, 10);
    expect(segments[0]).toMatchObject({ lower: 1, upper: 10 });
    expect(segments[1]).toMatchObject({ lower: -10, upper: -1 });
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe("normalizeSegments – edge cases", () => {
  it("handles an empty segment array without throwing", () => {
    expect(() => normalizeSegments([], 0, 100)).not.toThrow();
  });

  it("handles NaN lower (treated same as undefined)", () => {
    const segments = [seg(NaN, 50)];
    normalizeSegments(segments, 0, 100);
    expect(segments[0].lower).toBe(0);
  });

  it("handles NaN upper (treated same as undefined)", () => {
    const segments = [seg(10, NaN)];
    normalizeSegments(segments, 0, 100);
    expect(segments[0].upper).toBe(100);
  });

  it("works with a purely negative range", () => {
    const segments = [seg(undefined, -5)];
    normalizeSegments(segments, -20, -1);
    expect(segments[0].lower).toBe(-20);
    expect(segments[0].upper).toBe(-5);
  });
});
