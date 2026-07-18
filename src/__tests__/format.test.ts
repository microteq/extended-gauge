/*****************************************************************************************************************************/
/* Purpose: Tests for formatNumber utility
/* History: 12-JUL-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import { formatNumber } from "../utils/format";
import { FrontendLocaleData } from "custom-card-helpers";

// Minimal locale stub that reports "." as the decimal separator
const enLocale: FrontendLocaleData = {
  language: "en",
  number_format: "decimal_comma",
} as any;

describe("formatNumber", () => {
  describe("integer formatting (no decimals)", () => {
    it("formats a whole number with no options as an integer string", () => {
      expect(formatNumber(42, enLocale)).toBe("42");
    });

    it("formats zero", () => {
      expect(formatNumber(0, enLocale)).toBe("0");
    });

    it("formats a negative integer", () => {
      expect(formatNumber(-7, enLocale)).toBe("-7");
    });

    it("returns an empty string for a string value (non-number guard)", () => {
      expect(formatNumber("hello" as any, enLocale)).toBe("");
    });
  });

  describe("decimal formatting", () => {
    it("rounds to the specified number of decimal places", () => {
      expect(formatNumber(3.14159, enLocale, { decimalPlaces: 2 })).toBe(
        "3.14"
      );
    });

    it("pads with trailing zeros when decimalPlaces exceeds actual precision", () => {
      expect(formatNumber(1, enLocale, { decimalPlaces: 3 })).toBe("1.000");
    });

    it("rounds 2.5 to 3 when decimalPlaces is 0", () => {
      expect(formatNumber(2.5, enLocale, { decimalPlaces: 0 })).toBe("3");
    });

    it("uses a custom decimal separator", () => {
      expect(
        formatNumber(1.5, enLocale, { decimalPlaces: 1, decimalSeparator: "," })
      ).toBe("1,5");
    });
  });

  describe("thousands separator", () => {
    it("inserts a thousands separator for large numbers", () => {
      expect(formatNumber(1234567, enLocale, { thousandSeparator: "," })).toBe(
        "1,234,567"
      );
    });

    it("does not insert separator when thousandSeparator is empty string", () => {
      expect(formatNumber(1234567, enLocale, { thousandSeparator: "" })).toBe(
        "1234567"
      );
    });

    it("handles a period as the thousands separator", () => {
      expect(formatNumber(1000, enLocale, { thousandSeparator: "." })).toBe(
        "1.000"
      );
    });

    it("preserves the negative sign before the digits", () => {
      expect(formatNumber(-1234, enLocale, { thousandSeparator: "," })).toBe(
        "-1,234"
      );
    });

    it("handles numbers below 1000 without inserting a separator", () => {
      expect(formatNumber(999, enLocale, { thousandSeparator: "," })).toBe(
        "999"
      );
    });
  });

  describe("combined options", () => {
    it("applies both decimals and thousands separator together", () => {
      expect(
        formatNumber(1234567.89, enLocale, {
          decimalPlaces: 2,
          thousandSeparator: ",",
          decimalSeparator: ".",
        })
      ).toBe("1,234,567.89");
    });

    it("handles zero with decimals and separator", () => {
      expect(
        formatNumber(0, enLocale, {
          decimalPlaces: 2,
          thousandSeparator: ",",
          decimalSeparator: ".",
        })
      ).toBe("0.00");
    });
  });
});
