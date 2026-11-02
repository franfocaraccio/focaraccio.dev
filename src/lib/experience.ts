/** First day at Accenture. */
const CAREER_START = new Date("2014-12-01T00:00:00Z");

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

/**
 * Years of professional experience as of `now`, rounded to the nearest year so
 * the figure matches the one stated on the CV. Flooring would read a year low
 * for most of each year.
 */
export function yearsOfExperience(now: Date = new Date()): number {
  return Math.round((now.getTime() - CAREER_START.getTime()) / MS_PER_YEAR);
}
