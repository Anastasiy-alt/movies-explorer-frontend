import Api from './MainApi';
// export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const BASE_URL = 'http://localhost:3001';

export const getMovies = () => {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Origin: 'http://localhost:3001',
        },
        method: 'GET',

        // credentials: 'include',
    })
        .then(Api._check)
};