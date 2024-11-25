import { FaSearch } from "react-icons/fa";

const SearchBox = ({placeholder}) => {
    return (
        <>
            <div className="search-box">
                <input type="text" className="search-input" placeholder={placeholder}/>
                <button className="search-btn"><FaSearch className="icon" /></button>
            </div>
        </>
    )
}

export default SearchBox