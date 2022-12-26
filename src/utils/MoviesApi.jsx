import Api from './MainApi';
export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getMovies = () => {
    return fetch(`${this._baseUrlL}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })
        .then(Api._check)
};