import { createHash, timingSafeEqual } from "node:crypto";

/**
 * HTTP Basic auth for the private /stats page. Any username works; the
 * password is the STATS_PASSWORD environment variable. Without that variable
 * the page stays locked.
 */
export function isStatsAuthorized(authorization: string | null) {
  const expected = process.env.STATS_PASSWORD;
  if (!expected || !authorization?.startsWith("Basic ")) return false;

  const decoded = Buffer.from(authorization.slice(6), "base64").toString();
  const password = decoded.slice(decoded.indexOf(":") + 1);

  // Hash both sides so the comparison is constant-time regardless of length.
  const digest = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(password), digest(expected));
}
