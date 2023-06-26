import { baseUrlQuote } from './constants';

const makeRequestToQuote = (method) => {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${baseUrlQuote}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Ошибка код ${response.status}`);
  });
};

const randomQuote = () => makeRequestToQuote('GET');

export default randomQuote;
