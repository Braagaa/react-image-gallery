import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MagnifySVG from './MagnifySVG';

class SearchBar extends Component {
    onChangeHandle = e => this.props.setSearchText(e.currentTarget.value);

    submitHandle = e => {
        e.preventDefault();
        
        //redirect to gallery/:gallery/:page
        //default page 1
        this.props.history.push(`/gallery/${this.props.searchText}/1`);
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.submitHandle}>
                <input 
                    type="search" 
                    name="search" 
                    placeholder="Search"
                    value={this.props.searchText}
                    onChange={this.onChangeHandle}
                    required
                />
                <button type="submit" className="search-button">
                    <MagnifySVG/>
                </button>
            </form>
        );
    }
}

SearchBar.propTypes = {
    setPhotos: PropTypes.func,
    setSearchText: PropTypes.func,
    searchText: PropTypes.string
};

export default SearchBar;
