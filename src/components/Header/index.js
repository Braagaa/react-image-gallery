import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from './Search-Bar';

const Header = props => (
    <header>
        <div>
            <h1 className="title">React Image Gallery</h1>
        </div>
        <SearchBar {...props}/>
    </header>
);

Header.propTypes = {
    setPhotos: PropTypes.func,
    setSearchText: PropTypes.func,
    searchText: PropTypes.string
};

export default Header;
