import { FaSearch } from "react-icons/fa";

const SearchBox = ({ placeholder, onSearch }) => {
    const handleSearch = (e) => {
        const value = e.target.value;
        onSearch(value);
    };

    return (
        <>
            <div className="search-box">
                <input 
                    type="text" 
                    className="search-input" 
                    onChange={handleSearch}
                    placeholder={placeholder}
                />
                <button className="search-btn"><FaSearch className="icon" /></button>
            </div>
        </>
    )
}

export default SearchBox