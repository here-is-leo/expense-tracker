import type { NormalizedApiError } from "@/types/api";

export function isNormalizedApiError(
  error: unknown,
): error is NormalizedApiError {
  if (!error || typeof error !== "object" || Array.isArray(error)) {
    return false;
  }

  const candidate = error as Partial<NormalizedApiError>;
  return (
    typeof candidate.status === "number" && typeof candidate.message === "string"
  );
}
