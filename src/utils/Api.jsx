class Api {
    constructor(option) {
        this._baseUrl = option.baseUrl;
        this._headers = option.headers;
    }

    _check(res) {
        if (res.ok) {
            return res.json();
          }
          return res.json()
            .then((err) => {
            err.statusCode = res.status; 
            return Promise.reject(err);
           })
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
            method: 'GET'
        })
            .then(res => this._check(res))
    }

    setUser(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: userData.name,
                email: userData.email
            })
        })
            .then(res => this._check(res))
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: 'include',
            headers: this._headers,
            method: 'GET'
        })
            .then(res => this._check(res))

    }

    addMovies(movieData) {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                country: movieData.country,
                director: movieData.director,
                duration: movieData.duration,
                year: movieData.year,
                description: movieData.description,
                image: movieData.image,
                trailer: movieData.trailer,
                nameRU: movieData.nameRU,
                nameEN: movieData.nameEN,
                thumbnail: movieData.thumbnail,
                movieId: movieData.movieId
            })
        })
            .then(res => this._check(res));
    }

    deleteSavedMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers,
        })
            .then(res => this._check(res))
    }

    signUp(userData) {
        return fetch(`${this._baseUrl}/signup`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                password: userData.password,
                email: userData.email
            })
        })
            .then(res => this._check(res));
    }

}

const api = new Api({
    baseUrl: 'https://api.movies.anastasiya.nomoredomains.club',
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;