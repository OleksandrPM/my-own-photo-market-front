import type { AxiosRequestConfig } from "axios";

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export type ApiErrorBody = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
  fieldErrors?: Record<string, string | string[]>;
};

export type AxiosBaseQueryError = {
  status?: number;
  data?: unknown;
  message: string;
};
