import axios from "axios";
import type { Locale } from "../types/content";

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: {
    locale?: Locale;
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_STRAPI_URL || "http://localhost:1337",
});

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_STRAPI_API_TOKEN;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function withLocale(locale: Locale) {
  return { locale, populate: "deep" };
}
