/** First day at Accenture. */
const CAREER_START = new Date("2014-12-01T00:00:00Z");

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/** Full years of professional experience as of `now`. */
export function yearsOfExperience(now: Date = new Date()): number {
  return Math.floor((now.getTime() - CAREER_START.getTime()) / MS_PER_YEAR);
}
