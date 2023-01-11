import { request } from "../utils/request";

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function register(email, username, password) {
  // try {
  const result = await request("/api/auth/local/register", {
    method: "POST",
    auth: false,
    body: {
      email,
      username,
      password,
      name: username
    }
  });
  // console.log(result);
  setJwtToken(result.jwt);
  saveUser(result.user);
  // 建立個人資料
  return result.user;
  // } catch (error) {
  //   throw error;
  // }
}

export async function login(email, password) {
  try {
    const result = await request("/api/auth/local", {
      method: "POST",
      auth: false,
      body: {
        identifier: email,
        password
      }
    });
    setJwtToken(result.jwt);
    saveUser(result.user);
    return result.user;
  } catch (error) {
    console.log(231);
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}
