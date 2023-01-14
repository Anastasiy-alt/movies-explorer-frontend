import Toggle from "../Toggle/Toggle";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

function SearchForm({ onFilter, moviesFilter, keyword, onSearchChange, onSubmit, onClick }) {

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorText, setErrorText] = useState('');
    const location = useLocation();
    const { isValid } = useFormAndValidation();


    const handleSavedMoviesFormSubmit = (e) => {
        e.preventDefault()
        setIsFormValid(e.target.closest('form').checkValidity());
        if (!isFormValid) {
            return setErrorText('Ведите название фильма');
        }
        onSubmit()
    }

    const handleChange = (e) => {
        setIsFormValid(e.target.closest('form').checkValidity());
        onSearchChange(e.target.value);
    }

    return (
        <div className='search'>
            <form className='search__form' noValidate onSubmit={handleSavedMoviesFormSubmit}>
                <input
                    type="text"
                    placeholder='Фильм'
                    className='search__input'
                    name='search'
                    value={keyword || ''}
                    onChange={handleChange}
                    required />

                <button type="submit" className="button search__button" onClick={onClick}></button>
            </form>
            <Toggle onFilter={onFilter} moviesFilter={moviesFilter} />
            <span className="search__error">
                {(!isFormValid & location.pathname === '/movies') ? (errorText) : ('')}
            </span>
        </div>
    )
}

export default SearchForm;
