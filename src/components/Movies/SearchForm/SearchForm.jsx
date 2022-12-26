import Toggle from "../Toggle/Toggle";
import { useFormAndValidation } from "../../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../../context/CurrentUserContext";
import { useContext } from "react";

function SearchForm({ onSearch }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid } = useFormAndValidation();
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(values.search);
      };

    return (
        <div className='search'>
            <form className='search__form' noValidate onSubmit={handleSubmit}>
                <input type="text" placeholder='Фильм' className='search__input' name='search' required />
                <button type="submit" className="button search__button"></button>
            </form>
            <Toggle />
        </div>
    )
}

export default SearchForm;