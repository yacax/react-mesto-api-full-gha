/* eslint-disable */
import {
  pictureToken,
  baseUrlPicture
} from "./constants.js"

const makeRequestToPicture = (url, method, body, pictureToken) => {
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

  if (pictureToken) {
    options.headers.Authorization = `Client-ID ${pictureToken}`;
  }

  return fetch(`${baseUrlPicture}${url}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка код ${response.status}`);
  });
};


export const getPicture = () => {
  return makeRequestToPicture("/photos/random", "GET", null, pictureToken);
};
