import type { ApiErrorBody } from "./types";
import { isApiErrorBody, isAxiosBaseQueryError, isRecord } from "./guards";

export function normalizeMessage(m?: string | string[]) {
  if (!m) return null;
  return Array.isArray(m) ? m.join(", ") : m;
}

export function extractApiErrorBody(err: unknown): ApiErrorBody | null {
  if (!isRecord(err)) return null;

  const data = err["data"];
  if (!isRecord(data)) return null;

  const body: ApiErrorBody = {};

  if (typeof data["message"] === "string" || Array.isArray(data["message"])) {
    body.message = data["message"] as ApiErrorBody["message"];
  }
  if (typeof data["error"] === "string") body.error = data["error"] as string;
  if (typeof data["statusCode"] === "number")
    body.statusCode = data["statusCode"] as number;

  const fe = data["fieldErrors"];
  if (isRecord(fe)) body.fieldErrors = fe as ApiErrorBody["fieldErrors"];

  return body;
}

export function extractApiMessage(err: unknown): string | null {
  // 1) axiosBaseQuery error
  if (isAxiosBaseQueryError(err)) {
    if (isApiErrorBody(err.data)) {
      const m = err.data.message;
      if (Array.isArray(m)) return m.join(", ");
      if (typeof m === "string") return m;
    }
    return err.message || null;
  }

  // 2) Simple Error
  if (err instanceof Error) return err.message;

  return null;
}
