/**
 * getIconSvgPath resolves icon names to raw SVG path strings.
 * It supports two strategies:
 *   1. window.customIconsets  — a map of setName → resolver function
 *   2. A throwaway <ha-icon> element (browser-only fallback)
 *
 * These tests run in Node (no DOM), so strategy 2 always returns null.
 * Tests for strategy 1 inject a fake window.customIconsets.
 */

// We need a fresh module for each test group so the module-level cache is reset.
// Jest's module registry is cleared between describe blocks via jest.resetModules().

describe("getIconSvgPath – strategy 1: window.customIconsets", () => {
  let getIconSvgPath: (icon: string) => Promise<string | null>;

  beforeEach(async () => {
    // Reset module so the cache map is brand-new for every test.
    jest.resetModules();
    ({ getIconSvgPath } = await import("../utils/get-icon-svg-path"));
  });

  afterEach(() => {
    // Clean up any customIconsets shim we installed.
    delete (global as any).window;
  });

  it("returns the path from customIconsets for a known MDI icon", async () => {
    (global as any).window = {
      customIconsets: {
        mdi: jest.fn().mockResolvedValue({ path: "M10,10 L20,20" }),
      },
    };
    const result = await getIconSvgPath("mdi:home");
    expect(result).toBe("M10,10 L20,20");
  });

  it("resolves a custom icon set (e.g. hacs:hacs) via customIconsets", async () => {
    (global as any).window = {
      customIconsets: {
        hacs: jest.fn().mockResolvedValue({ path: "M0 0 L24 24" }),
      },
    };
    const result = await getIconSvgPath("hacs:hacs");
    expect(result).toBe("M0 0 L24 24");
  });

  it("resolves a custom icon set via window.customIcons (strategy 1b)", async () => {
    (global as any).window = {
      customIcons: {
        hacs: { getIcon: jest.fn().mockResolvedValue({ path: "M5 5 L20 20" }) },
      },
    };
    const result = await getIconSvgPath("hacs:hacs");
    expect(result).toBe("M5 5 L20 20");
  });

  it("falls back to customIcons when customIconsets has no resolver for the set", async () => {
    (global as any).window = {
      customIconsets: {},
      customIcons: {
        myicons: {
          getIcon: jest.fn().mockResolvedValue({ path: "M1 1 L5 5" }),
        },
      },
    };
    const result = await getIconSvgPath("myicons:star");
    expect(result).toBe("M1 1 L5 5");
  });

  it("passes the correct icon name (without the set prefix) to the resolver", async () => {
    const resolver = jest.fn().mockResolvedValue({ path: "M1 2" });
    (global as any).window = { customIconsets: { mdi: resolver } };
    await getIconSvgPath("mdi:lightbulb");
    expect(resolver).toHaveBeenCalledWith("lightbulb");
  });

  it("returns null when the resolver returns null", async () => {
    (global as any).window = {
      customIconsets: { mdi: jest.fn().mockResolvedValue(null) },
    };
    const result = await getIconSvgPath("mdi:unknown");
    expect(result).toBeNull();
  });

  it("returns null when the resolver returns an object with no path field", async () => {
    (global as any).window = {
      customIconsets: { mdi: jest.fn().mockResolvedValue({}) },
    };
    const result = await getIconSvgPath("mdi:no-path");
    expect(result).toBeNull();
  });

  it("returns null when the icon set is not registered in customIconsets", async () => {
    (global as any).window = { customIconsets: {} };
    const result = await getIconSvgPath("unknown-set:some-icon");
    expect(result).toBeNull();
  });

  it("returns null when customIconsets is undefined", async () => {
    (global as any).window = {};
    const result = await getIconSvgPath("mdi:home");
    expect(result).toBeNull();
  });

  it("returns null when window is undefined (Node environment without shim)", async () => {
    // global.window is already undefined in Node; no shim installed.
    const result = await getIconSvgPath("mdi:home");
    expect(result).toBeNull();
  });

  it("caches the resolved path so the resolver is only called once", async () => {
    const resolver = jest.fn().mockResolvedValue({ path: "M5 5" });
    (global as any).window = { customIconsets: { mdi: resolver } };
    await getIconSvgPath("mdi:cached");
    await getIconSvgPath("mdi:cached");
    expect(resolver).toHaveBeenCalledTimes(1);
  });

  it("does not cache null results so failed icons can be retried", async () => {
    const resolver = jest.fn().mockResolvedValue(null);
    (global as any).window = { customIconsets: { mdi: resolver } };
    await getIconSvgPath("mdi:will-fail");
    await getIconSvgPath("mdi:will-fail");
    // Resolver is called again because null is not cached.
    expect(resolver).toHaveBeenCalledTimes(2);
  });

  it("does not confuse different icons in the cache", async () => {
    (global as any).window = {
      customIconsets: {
        mdi: jest
          .fn()
          .mockImplementation((name: string) =>
            Promise.resolve({ path: `path-for-${name}` })
          ),
      },
    };
    expect(await getIconSvgPath("mdi:home")).toBe("path-for-home");
    expect(await getIconSvgPath("mdi:car")).toBe("path-for-car");
  });

  it("handles icons without a colon prefix gracefully (returns null)", async () => {
    (global as any).window = { customIconsets: { mdi: jest.fn() } };
    const result = await getIconSvgPath("no-colon");
    expect(result).toBeNull();
  });

  it("handles an icon string that is just a colon", async () => {
    (global as any).window = {
      customIconsets: { "": jest.fn().mockResolvedValue(null) },
    };
    const result = await getIconSvgPath(":");
    // set name = "", icon name = "" — resolver called with ""
    expect(result).toBeNull();
  });
});

describe("getIconSvgPath – strategy 2: ha-icon element fallback (browser-only)", () => {
  let getIconSvgPath: (icon: string) => Promise<string | null>;

  beforeEach(async () => {
    jest.resetModules();
    ({ getIconSvgPath } = await import("../utils/get-icon-svg-path"));
    // No customIconsets → strategy 1 produces nothing, falls through to strategy 2.
    (global as any).window = {};
  });

  afterEach(() => {
    delete (global as any).window;
  });

  it("returns null in Node where customElements is not defined", async () => {
    // Node test environment has no customElements global.
    const result = await getIconSvgPath("mdi:home");
    expect(result).toBeNull();
  });

  it("returns null even when customElements is defined but ha-icon is not registered", async () => {
    (global as any).customElements = { get: () => undefined };
    const result = await getIconSvgPath("mdi:lightbulb");
    expect(result).toBeNull();
    delete (global as any).customElements;
  });
});
