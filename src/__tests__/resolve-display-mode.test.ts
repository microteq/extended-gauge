/*****************************************************************************************************************************/
/* Purpose: Tests for resolveDisplayMode utility, including backward compatibility with the legacy show_needle config
/* History: 14-JUL-2026 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import { resolveDisplayMode } from "../utils/resolve-display-mode";

describe("resolveDisplayMode", () => {
  describe("display_mode (current config)", () => {
    it("resolves gauge_and_needle to needle, no dial, segments shown", () => {
      expect(resolveDisplayMode({ display_mode: "gauge_and_needle" })).toEqual({
        showNeedle: true,
        showDial: false,
        showSegments: true,
      });
    });

    it("resolves dial_only to dial only, no needle, no segments", () => {
      expect(resolveDisplayMode({ display_mode: "dial_only" })).toEqual({
        showNeedle: false,
        showDial: true,
        showSegments: false,
      });
    });

    it("resolves dial_and_needle to needle+dial, no segments", () => {
      expect(resolveDisplayMode({ display_mode: "dial_and_needle" })).toEqual({
        showNeedle: true,
        showDial: true,
        showSegments: false,
      });
    });
  });

  describe("legacy show_needle (backward compatibility)", () => {
    it("legacy show_needle takes precedence over display_mode when both are set", () => {
      expect(
        resolveDisplayMode({
          display_mode: "dial_only",
          show_needle: true,
        })
      ).toEqual({ showNeedle: true, showDial: false, showSegments: true });
    });

    it("falls back to gauge_and_needle-equivalent defaults when config is undefined", () => {
      expect(resolveDisplayMode(undefined)).toEqual({
        showNeedle: true,
        showDial: false,
        showSegments: true,
      });
    });

    it("falls back to gauge_and_needle-equivalent defaults when config has neither display_mode nor show_needle", () => {
      expect(resolveDisplayMode({})).toEqual({
        showNeedle: true,
        showDial: false,
        showSegments: true,
      });
    });

    it("show_needle: true shows needle and segments, hides the dial arc", () => {
      expect(resolveDisplayMode({ show_needle: true })).toEqual({
        showNeedle: true,
        showDial: false,
        showSegments: true,
      });
    });

    it("show_needle: false hides needle and segments, shows the dial arc", () => {
      expect(resolveDisplayMode({ show_needle: false })).toEqual({
        showNeedle: false,
        showDial: true,
        showSegments: false,
      });
    });
  });
});
