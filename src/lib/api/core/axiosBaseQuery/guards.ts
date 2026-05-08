import type { ApiErrorBody, AxiosBaseQueryError } from "./types";

export function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

export function isAxiosBaseQueryError(
  err: unknown,
): err is AxiosBaseQueryError {
  if (!isRecord(err)) return false;
  return typeof err["message"] === "string";
}

export function isApiErrorBody(data: unknown): data is ApiErrorBody {
  if (!isRecord(data)) return false;

  const msg = data["message"];
  const msgOk =
    typeof msg === "string" ||
    (Array.isArray(msg) && msg.every((x) => typeof x === "string"));

  return (
    msgOk ||
    typeof data["error"] === "string" ||
    typeof data["statusCode"] === "number" ||
    typeof data["fieldErrors"] === "object"
  );
}
