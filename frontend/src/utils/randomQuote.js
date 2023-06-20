import { baseUrlQuote } from "./constants.js"

const makeRequestToQuote = (method) => {
  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return fetch(`${baseUrlQuote}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка код ${response.status}`);
  });
};

export const randomQuote = () => {
  return makeRequestToQuote("GET");
};
