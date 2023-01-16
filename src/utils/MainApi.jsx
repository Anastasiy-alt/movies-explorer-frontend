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
                console.dir(err)
                err.statusCode = res.status;
                return Promise.reject(err);
            })
    }

    getUser(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'authorization': `Bearer ${jwt}`,
            },
            method: 'GET'
        })
            .then(res => this._check(res))
    }

    setUserInfo({ name, email }, jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
           headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'authorization': `Bearer ${jwt}`,
            },            
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                email: email
            })
        })
            .then(res => this._check(res))
    }

    getSavedMovies(jwt) {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'authorization': `Bearer ${jwt}`,
            },
            method: 'GET'
        })
            .then(res => this._check(res))

    }

    saveMovie(movieData, jwt) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify(
                {
                    country: movieData.country,
                    director: movieData.director,
                    duration: movieData.duration,
                    year: movieData.year,
                    description: movieData.description,
                    image: `https://api.nomoreparties.co${movieData.image.url}`,
                    trailerLink: movieData.trailerLink,
                    nameRU: movieData.nameRU,
                    nameEN: movieData.nameEN,
                    thumbnail: `https://api.nomoreparties.co${movieData.image.formats.thumbnail.url}`,
                    movieId: movieData.id,
                }
            )
        })
            .then(res => this._check(res));
    }

    deleteSavedMovie(movieId, jwt) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'authorization': `Bearer ${jwt}`,
            },
        })
            .then(res => this._check(res))
    }

    logout() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
            },
        })
            .then(res => this._check(res))
    }
}

const api = new Api({
    baseUrl: 'https://api.movies.anastasiya.nomoredomains.club',
    // baseUrl: 'http://localhost:3001',
    headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
});

export default api;