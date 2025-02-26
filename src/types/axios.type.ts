import { AxiosError, HttpStatusCode } from "axios";

export type HandledAxiosErrorType = {
  message: string;
  status: HttpStatusCode;
  statusText: string;
  error: AxiosError;
};
