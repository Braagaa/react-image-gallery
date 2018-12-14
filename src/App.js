import React, { Component } from 'react';
import axios from 'axios';
import randomWords from 'random-words';
import * as R from 'ramda';

import {getFlickrPhotos, cleanFlickrData} from './modules/flickr';
import Header from './components/Header/';
import Home from './pages/Home';

class App extends Component {
    state = {
        searchText: '',
        featuredGalleries: [],
        currentGallery: {}
    };

    changeState = prop => value =>
        this.setState(state => ({...this.state, [prop]: value}));

    setPhotosHandle = text => {
        getFlickrPhotos(text)
            .then(cleanFlickrData)
            .then(this.changeState('currentGallery'))
            .then(R.partial(this.changeState('searchText'), ['']))
            .catch(console.error);
    }

    setSearchTextHandle = this.changeState('searchText');

    componentDidMount() {
        Promise.resolve(randomWords({exactly: 3}))
            .then(R.map(getFlickrPhotos))
            .then(axios.all)
            .then(R.map(cleanFlickrData))
            .then(this.changeState('featuredGalleries'))
            .catch(console.error);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Header 
                    setPhotos={this.setPhotosHandle} 
                    setSearchText={this.setSearchTextHandle}
                    searchText={this.state.searchText}
                />
                <Home featuredGalleries={this.state.featuredGalleries}/>
            </div>
        );
    }
}

export default App;
