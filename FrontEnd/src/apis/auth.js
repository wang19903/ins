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
  // try {
  const result = await request("/api/auth/local", {
    method: "POST",
    auth: false,
    body: {
      identifier: email,
      password
    }
  });

  if (result.user) {
    console.log(result, 321);
    setJwtToken(result.jwt);
    saveUser(result.user);
    return result.user;
  } else {
    console.log(result.error.message);
    return result.error.message;
  }
  // } catch (error) {
  //   throw error;
  // }
}

export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}
