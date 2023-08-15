import { getJwtToken } from "../apis/auth";

export async function request(
  url: string,
  {
    method = "GET",
    body,
    headers,
    auth = true
  }: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    auth?: boolean;
  }={}
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
      ...headers
    },
    ...(body && { body: JSON.stringify(body) })
  });

  // if (res.status < 300) {
  const result = await res.json();
  return result;
  // }
  // } catch (error) {
  //   throw error;
  // }
}
