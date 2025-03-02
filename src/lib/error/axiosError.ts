import { ApiErrorResponseDataType, HandledAxiosErrorType } from "@/types";
import { AxiosError, HttpStatusCode, isAxiosError } from "axios";
import { toast } from "sonner";

export const handleErrorIntercepter = (error: AxiosError): void => {
  if (isAxiosError<ApiErrorResponseDataType>(error)) {
    switch (error.status) {
      case HttpStatusCode.Forbidden:
        toast("Unauthorized");
        break;
      default:
        break;
    }
  }
};

export function isHandledAxiosError(
  error: any
): error is HandledAxiosErrorType {
  return (
    typeof error === "object" &&
    "handledMessage" in error &&
    typeof error.handledMessage === "string"
  );
}
