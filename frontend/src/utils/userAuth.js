import {
  baseUrlAuth
} from "./constants.js"

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${baseUrlAuth}${url}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка код ${response.status}`);
  });
};

export const register = (name, about, avatar, email, password) => {
  return makeRequest("/signup", "POST", {
    name,
    about,
    avatar,
    email,
    password,
  });
};
export const authorize = (email, password) => {
  return makeRequest("/signin", "POST", { email, password });
};

export const getUserData = (token) => {
  return makeRequest("/users/me", "GET", null, token);
};
