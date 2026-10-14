const inFlight = new Set<string>();

export type AIResult =
  | { status: "ok"; content: unknown; requestId: string }
  | { status: "unavailable" | "rate_limited" | "invalid_output" | "timeout" | "error" | "cancelled" | "duplicate" | "stale"; message: string; requestId: string };

export async function requestGeneration(
  step: string,
  context: unknown,
  requestId: string,
  signal?: AbortSignal
): Promise<AIResult> {
  if (inFlight.has(requestId)) return { status: "duplicate", message: "Duplicate submission ignored.", requestId };
  inFlight.add(requestId);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  const onAbort = () => controller.abort();
  if (signal) signal.addEventListener("abort", onAbort);
  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step, context, request_id: requestId }),
      signal: controller.signal,
    });
    const data = await res.json();
    return (data?.status === "ok"
      ? { status: "ok", content: data.content, requestId }
      : { status: data?.status ?? "error", message: data?.message ?? "Unknown error.", requestId }) as AIResult;
  } catch (e: any) {
    if (e?.name === "AbortError") return { status: (signal?.aborted ? "cancelled" : "timeout"), message: "Request cancelled or timed out.", requestId };
    return { status: "error", message: "Network error.", requestId };
  } finally {
    clearTimeout(timer);
    if (signal) signal.removeEventListener("abort", onAbort);
    inFlight.delete(requestId);
  }
}

export function rejectStale(currentRequestId: string, incomingRequestId: string): boolean {
  return currentRequestId !== incomingRequestId;
}
