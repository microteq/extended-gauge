/*****************************************************************************************************************************/
/* Purpose: Tests for pure gauge math helpers (gauge-math.ts)
/* History: 12-JUL-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import {
  normalizeValue,
  getValueInPercentage,
  getAngle,
} from "../utils/gauge-math";

describe("normalizeValue", () => {
  it("returns the value unchanged when inside [min, max]", () => {
    expect(normalizeValue(50, 0, 100)).toBe(50);
  });

  it("clamps a value above max to max", () => {
    expect(normalizeValue(150, 0, 100)).toBe(100);
  });

  it("clamps a value below min to min", () => {
    expect(normalizeValue(-10, 0, 100)).toBe(0);
  });

  it("returns 0 when value is NaN", () => {
    expect(normalizeValue(NaN, 0, 100)).toBe(0);
  });

  it("returns 0 when min is NaN", () => {
    expect(normalizeValue(50, NaN, 100)).toBe(0);
  });

  it("returns 0 when max is NaN", () => {
    expect(normalizeValue(50, 0, NaN)).toBe(0);
  });

  it("returns min when value equals min exactly", () => {
    expect(normalizeValue(-20, -20, 80)).toBe(-20);
  });

  it("returns max when value equals max exactly", () => {
    expect(normalizeValue(80, -20, 80)).toBe(80);
  });

  it("works with a purely negative range", () => {
    expect(normalizeValue(-5, -10, 0)).toBe(-5);
    expect(normalizeValue(5, -10, 0)).toBe(0);
    expect(normalizeValue(-15, -10, 0)).toBe(-10);
  });
});

describe("getValueInPercentage", () => {
  it("returns 0 at min", () => {
    expect(getValueInPercentage(0, 0, 100)).toBe(0);
  });

  it("returns 100 at max", () => {
    expect(getValueInPercentage(100, 0, 100)).toBe(100);
  });

  it("returns 50 at the mid-point", () => {
    expect(getValueInPercentage(50, 0, 100)).toBe(50);
  });

  it("works with a non-zero minimum", () => {
    expect(getValueInPercentage(150, 100, 200)).toBe(50);
  });

  it("works with a negative range", () => {
    expect(getValueInPercentage(-5, -10, 0)).toBe(50);
  });

  it("returns 25 for the first quartile", () => {
    expect(getValueInPercentage(25, 0, 100)).toBe(25);
  });
});

describe("getAngle", () => {
  it("returns 0° at the minimum value", () => {
    expect(getAngle(0, 0, 100)).toBe(0);
  });

  it("returns 180° at the maximum value", () => {
    expect(getAngle(100, 0, 100)).toBe(180);
  });

  it("returns 90° at the mid-point", () => {
    expect(getAngle(50, 0, 100)).toBe(90);
  });

  it("clamps a value above max to 180°", () => {
    expect(getAngle(200, 0, 100)).toBe(180);
  });

  it("clamps a value below min to 0°", () => {
    expect(getAngle(-50, 0, 100)).toBe(0);
  });

  it("returns 0 for NaN input (normalizeValue guard)", () => {
    expect(getAngle(NaN, 0, 100)).toBe(0);
  });

  it("maps quarter-points proportionally (45° and 135°)", () => {
    expect(getAngle(25, 0, 100)).toBe(45);
    expect(getAngle(75, 0, 100)).toBe(135);
  });

  it("works with a custom range [20, 80]", () => {
    expect(getAngle(50, 20, 80)).toBe(90);
    expect(getAngle(20, 20, 80)).toBe(0);
    expect(getAngle(80, 20, 80)).toBe(180);
  });

  it("works with a negative range [-20, 0]", () => {
    expect(getAngle(-10, -20, 0)).toBe(90);
    expect(getAngle(-20, -20, 0)).toBe(0);
    expect(getAngle(0, -20, 0)).toBe(180);
  });
});
