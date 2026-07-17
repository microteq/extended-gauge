// Minimal stub for the `lit` package used in unit tests.
export const css = (s: TemplateStringsArray, ..._values: any[]) => s;
export const html = (s: TemplateStringsArray, ..._values: any[]) => s;
export const svg = (s: TemplateStringsArray, ..._values: any[]) => s;
export class LitElement {}
export type PropertyValues = Map<string, unknown>;
