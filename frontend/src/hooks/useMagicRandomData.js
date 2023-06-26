import { useState } from 'react';
import getPicture from '../utils/randomPicture';
import randomQuote from '../utils/randomQuote';

const useMagicRandomData = () => {
  const [magicRandomData, setMagicRandomData] = useState('');

  function smartTrim(str) {
    if (!str || typeof str !== 'string' || str.trim() === '') {
      return '';
    }
    if (str.length <= 30) {
      return str;
    }
    let end = -1;
    for (let i = 30; i >= 15; i -= 1) {
      if (str[i] === '.' || str[i] === '?' || str[i] === '!') {
        end = i + 1;
        break;
      }
    }
    if (end !== -1) {
      return str.substring(0, end);
    }
    end = Math.min(30, str.length);
    while (end > 0 && str[end] !== ' ') {
      end -= 1;
    }
    return str.substring(0, end);
  }

  const generateSomething = (activeInput) => {
    if (activeInput === 'link') {
      getPicture()
        .then((image) => {
          setMagicRandomData(image.urls.regular);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (activeInput === 'name') {
      randomQuote()
        .then((res) => setMagicRandomData(smartTrim(res.quote)))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return [magicRandomData, generateSomething];
};

export default useMagicRandomData;
