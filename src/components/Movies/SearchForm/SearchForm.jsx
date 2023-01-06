import Toggle from "../Toggle/Toggle";
import { useFormAndValidation } from "../../../hooks/useFormAndValidation";

function SearchForm({ onSearch, search, value }) {
    const { values, handleChange, errors, isValid } = useFormAndValidation();
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(values.search);
      };




    return (
        <div className='search'>
            <form className='search__form' noValidate onSubmit={search}>
                <input type="text" placeholder='Фильм' className='search__input' name='search' value={value} required />
                <button type="submit" className="button search__button"></button>
            </form>
            <Toggle />
        </div>
    )
}

export default SearchForm;