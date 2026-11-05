import { authClient } from "./auth-client";

export const API = process.env.NEXT_PUBLIC_API_URL;

export async function authFetch(path, options = {}) {
  const { data } = await authClient.token();
  return fetch(API + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data?.token}`,
    },
  });
}