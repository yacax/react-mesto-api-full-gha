import {
  baseUrl,
} from './constants';

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${baseUrl}${url}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка код ${response.status}`);
  });
};

export const register = (name, about, avatar, email, password) => makeRequest('/signup', 'POST', {
  name,
  about,
  avatar,
  email,
  password,
});
export const authorize = (email, password) => makeRequest('/signin', 'POST', { email, password });

export const getUserData = (token) => makeRequest('/users/me', 'GET', null, token);
