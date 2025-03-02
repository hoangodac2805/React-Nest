import { AxiosError, HttpStatusCode } from "axios";

export type HandledAxiosErrorType = {
  handledMessage: string;
} & AxiosError;


export type ApiErrorResponseDataType = {
  error :string,
  message: string,
  statusCode:number
}