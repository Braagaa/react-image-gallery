import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {PropsRoute} from 'react-router-with-props';
import axios from 'axios';
import randomWords from 'random-words';
import * as R from 'ramda';

import {getFlickrPhotos, cleanFlickrData, nextPage} from './modules/flickr';
import Header from './components/Header/';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';

class App extends Component {
    state = {
        searchText: '',
        featuredGalleries: [],
        currentGallery: {}
    };

    changeState = prop => value =>
        this.setState(state => ({...this.state, [prop]: value}));

    setPhotosHandle = text => {
        return getFlickrPhotos(text)
            .then(cleanFlickrData)
            .then(this.changeState('currentGallery'))
            .then(R.partial(this.changeState('searchText'), ['']))
            .catch(console.error);
    };

    setNextPage = num => {
        return nextPage({
            tags: this.state.currentGallery.tags,
            page: num
        })
            .then(cleanFlickrData)
            .then(this.setCurrentGallery)
            .then(() => console.log(this.state.currentGallery))
            .catch(console.error);
    };

    setSearchTextHandle = this.changeState('searchText');
    setCurrentGallery = this.changeState('currentGallery');

    componentDidMount() {
        return Promise.resolve(randomWords({exactly: 3}))
            .then(R.map(getFlickrPhotos))
            .then(axios.all)
            .then(R.map(cleanFlickrData))
            .then(this.changeState('featuredGalleries'))
            .catch(console.error);
    };

    render() {
        console.log(this.state);
        return (
            <BrowserRouter>
                <div>
                    <PropsRoute 
                        path="/" 
                        setPhotos={this.setPhotosHandle} 
                        setSearchText={this.setSearchTextHandle}
                        searchText={this.state.searchText}
                        component={Header}
                    />
                    <PropsRoute 
                        exact
                        path="/"
                        featuredGalleries={this.state.featuredGalleries}
                        component={Home}
                    />
                    <PropsRoute 
                        path="/gallery"
                        featuredGalleries={this.state.featuredGalleries}
                        gallery={this.state.currentGallery}
                        setPage={this.setCurrentGallery}
                        setNextPage={this.setNextPage}
                        component={GalleryPage}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
