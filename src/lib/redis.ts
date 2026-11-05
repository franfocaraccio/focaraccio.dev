/**
 * Minimal client for the Upstash Redis REST API, enough for a few counters.
 * The Vercel integration injects the URL and tokens as KV_REST_API_*; the
 * read-only token is enough for anything that only reads.
 */
type Command = (string | number)[];
type Reply = { result?: unknown; error?: string };

export async function pipeline(commands: Command[], { readOnly = false } = {}) {
  const url = process.env.KV_REST_API_URL;
  const token = readOnly
    ? process.env.KV_REST_API_READ_ONLY_TOKEN
    : process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Upstash Redis is not configured (KV_REST_API_*)");

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Upstash Redis responded ${response.status}`);

  const replies = (await response.json()) as Reply[];
  return replies.map((reply) => {
    if (reply.error) throw new Error(`Upstash Redis: ${reply.error}`);
    return reply.result;
  });
}

/** HGETALL replies come back as a flat [field, value, field, value, …] list. */
export function toCounts(reply: unknown): Record<string, number> {
  const flat = Array.isArray(reply) ? (reply as string[]) : [];
  const counts: Record<string, number> = {};
  for (let i = 0; i < flat.length; i += 2) counts[flat[i]] = Number(flat[i + 1]) || 0;
  return counts;
}
