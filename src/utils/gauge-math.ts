export function normalizeValue(
  value: number,
  min: number,
  max: number
): number {
  if (isNaN(value) || isNaN(min) || isNaN(max)) return 0;
  if (value > max) return max;
  if (value < min) return min;
  return value;
}

export function getValueInPercentage(
  value: number,
  min: number,
  max: number
): number {
  return (100 * (value - min)) / (max - min);
}

export function getAngle(value: number, min: number, max: number): number {
  const pct = getValueInPercentage(normalizeValue(value, min, max), min, max);
  return (pct * 180) / 100;
}
