import React from 'react';

import MagnifySVG from './MagnifySVG';

const SearchBar = props => (
    <form className="search-form">
        <input type="search" name="search" placeholder="Search" required/>
        <button type="submit" className="search-button">
            <MagnifySVG/>
        </button>
    </form>
);

export default SearchBar;
