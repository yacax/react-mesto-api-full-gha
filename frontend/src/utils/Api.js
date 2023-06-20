import {
  baseUrl
} from "./constants.js"

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.token = '';
  };

  setToken(token) {
    this.token = `Bearer ${token}`;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  _request(url, options) {
    const headersWithToken = {
      ...options.headers,
      Authorization: this.token,
    }
    const optionsWithToken = {
      ...options,
      headers: headersWithToken
    }
    return fetch(url, optionsWithToken).then(this._handleResponse);
  };

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      headers: this.headers,
    });
  };

  getUserData() {
    return this._request(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    });
  };

  patchUserData(name, about) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    });
  };

  postNewCard({ name, link }) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    });
  };

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });
  };

  toggleLike(cardId, isLiked) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this.headers,
    });
  };

  patchAvatar(avatar) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    });
  };
}

const api = new Api({
  baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api };
