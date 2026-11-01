/** Pure formatting helper, deliberately independent from Astro. */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours} uur${rest ? ` ${rest} min` : ''}`;
}
