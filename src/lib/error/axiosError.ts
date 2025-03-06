import { ApiErrorResponseDataType, HandledAxiosErrorType } from "@/types";
import { AxiosError, HttpStatusCode, isAxiosError } from "axios";
import { toast } from "sonner";
import { cookies } from "../cookie";
import { REFRESH_TOKEN_NAME } from "@/config";

export const handleErrorIntercepter = (error: AxiosError): void => {
  if (isAxiosError<ApiErrorResponseDataType>(error)) {
    const { status, response } = error;
    switch (status) {
      case HttpStatusCode.Forbidden:
        toast("Forbidden");
        break;
      case HttpStatusCode.Unauthorized:
        if (response?.data.message === "Invalid or expired refresh token") {
          toast("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
          cookies.remove(REFRESH_TOKEN_NAME);
        }
        if (response?.data.message === "Invalid credentials") {
          toast("Thông tin không chính xác, vui lòng thử lại");
        }
        if (["jwt expired","Invalid access token"].includes(response?.data.message!)) {
        }
        break;
      default:
        toast("Some errors occured")
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
