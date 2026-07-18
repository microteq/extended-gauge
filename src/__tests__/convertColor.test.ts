/*****************************************************************************************************************************/
/* Purpose: Tests for convertColor utilities
/* History: 12-JUL-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import { rgbToHex, hexToRgb } from "../utils/convertColor";

describe("rgbToHex", () => {
  it("converts a basic RGB triplet to lowercase hex", () => {
    expect(rgbToHex([255, 0, 0])).toBe("#ff0000");
  });

  it("converts white [255,255,255] to #ffffff", () => {
    expect(rgbToHex([255, 255, 255])).toBe("#ffffff");
  });

  it("converts black [0,0,0] to #000000", () => {
    expect(rgbToHex([0, 0, 0])).toBe("#000000");
  });

  it("pads single-digit hex values with a leading zero", () => {
    expect(rgbToHex([1, 2, 3])).toBe("#010203");
  });

  it("returns an empty string when called with a falsy value", () => {
    expect(rgbToHex(undefined as any)).toBe("");
    expect(rgbToHex(null as any)).toBe("");
    // An empty array is truthy so the guard does not trigger; the map produces no hex digits
    expect(rgbToHex([] as any)).toBe("#");
  });
});

describe("hexToRgb", () => {
  describe("six-character hex (#rrggbb)", () => {
    it("parses #ff0000 as red", () => {
      expect(hexToRgb("#ff0000")).toEqual([255, 0, 0]);
    });

    it("parses #ffffff as white", () => {
      expect(hexToRgb("#ffffff")).toEqual([255, 255, 255]);
    });

    it("parses #000000 as black", () => {
      expect(hexToRgb("#000000")).toEqual([0, 0, 0]);
    });

    it("parses upper-case hex values", () => {
      expect(hexToRgb("#FF8800")).toEqual([255, 136, 0]);
    });

    it("handles leading and trailing whitespace", () => {
      expect(hexToRgb("  #aabbcc  ")).toEqual([170, 187, 204]);
    });
  });

  describe("three-character shorthand (#rgb)", () => {
    it("parses #f00 as [255,0,0]", () => {
      expect(hexToRgb("#f00")).toEqual([255, 0, 0]);
    });

    it("parses #fff as white", () => {
      expect(hexToRgb("#fff")).toEqual([255, 255, 255]);
    });

    it("parses #000 as black", () => {
      expect(hexToRgb("#000")).toEqual([0, 0, 0]);
    });

    it("expands each nibble correctly (#abc → [170,187,204])", () => {
      expect(hexToRgb("#abc")).toEqual([170, 187, 204]);
    });
  });

  describe("rgb() string format", () => {
    it("parses rgb(255, 0, 0) as red", () => {
      expect(hexToRgb("rgb(255, 0, 0)")).toEqual([255, 0, 0]);
    });

    it("parses rgb(0, 0, 0) as black", () => {
      expect(hexToRgb("rgb(0, 0, 0)")).toEqual([0, 0, 0]);
    });

    it("handles varying whitespace inside rgb()", () => {
      expect(hexToRgb("rgb(10,20,30)")).toEqual([10, 20, 30]);
    });
  });

  describe("invalid input", () => {
    it("returns null for an empty string", () => {
      expect(hexToRgb("")).toBeNull();
    });

    it("returns null for an unrecognised format", () => {
      expect(hexToRgb("not-a-color")).toBeNull();
    });

    it("returns null for a five-character hex string", () => {
      expect(hexToRgb("#12345")).toBeNull();
    });
  });
});

describe("rgbToHex / hexToRgb round-trip", () => {
  const samples: [number, number, number][] = [
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [128, 64, 192],
    [10, 20, 30],
  ];

  it.each(samples)(
    "round-trips [%i, %i, %i] through hex and back",
    (r, g, b) => {
      expect(hexToRgb(rgbToHex([r, g, b]))).toEqual([r, g, b]);
    }
  );
});
