import React from 'react';
import SearchBar from './Search-Bar';

const Header = props => (
    <header>
        <div>
            <h1 className="title">React Image Gallery</h1>
        </div>
        <SearchBar {...props}/>
    </header>
);

export default Header;
