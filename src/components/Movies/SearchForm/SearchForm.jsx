import Toggle from "../Toggle/Toggle";

function SearchForm() {
    return (
        <div className='search'>
            <form className='search__form' noValidate>
                <input type="search" placeholder='Фильм' className='search__input' required />
                <button type="submit" className="button search__button"></button>
            </form>
            <Toggle />
        </div>
    )
}

export default SearchForm;