import Api from './MainApi';
// export const BASE_URL = 'https://api.movies.anastasiya.nomoredomains.club';
export const BASE_URL = 'http://localhost:3001';

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            password: data.password,
            email: data.email,
        }),
        credentials: 'include',
    })
        .then(Api._check)
};

export const authorize = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: data.password,
            email: data.email,
        }),
        credentials: 'include'
    })
        .then(Api._check)
};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': "application/json",
        },
        credentials: 'include'
    })
        .then(Api._check)
    // .then(res => res.json())
    // .then(data => data)
}