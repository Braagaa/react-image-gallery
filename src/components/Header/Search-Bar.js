import React, {Component} from 'react';

import MagnifySVG from './MagnifySVG';

class SearchBar extends Component {
    onChangeHandle = e => this.props.setSearchText(e.currentTarget.value);

    submitHandle = e => {
        e.preventDefault();

        this.props.history.push(`/gallery/${this.props.searchText}`);
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

export default SearchBar;
