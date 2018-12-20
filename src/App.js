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
        isLoading: false,
        searchText: '',
        featuredGalleries: [],
        currentGallery: {}
    };

    changeState = prop => value =>
        this.setState(state => ({...this.state, [prop]: value}));

    setPhotos = text => {
        return Promise.resolve(text)
            .then(R.tap(R.partial(this.changeState('isLoading'), [false]))) //This will rend a loading component
            .then(getFlickrPhotos)
            .then(cleanFlickrData)
            .then(this.changeState('currentGallery'))
            .then(R.partial(this.changeState('searchText'), ['']))
            .then(R.partial(this.changeState('isLoading'), [true]))
            .catch(console.error);
    };

    setNextPage = num => {
        const params = {tags: this.state.currentGallery.tags, page: num}

        return Promise.resolve(params)
            .then(R.tap(R.partial(this.changeState('isLoading'), [false])))
            .then(nextPage)
            .then(cleanFlickrData)
            .then(this.setCurrentGallery)
            .then(R.tap(R.partial(this.changeState('isLoading'), [true])))
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
                        setPhotos={this.setPhotos} 
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
                        path="/gallery/:gallery"
                        featuredGalleries={this.state.featuredGalleries}
                        isLoading={this.state.isLoading}
                        gallery={this.state.currentGallery}
                        setGalleryloaded={this.setGalleryloaded}
                        setPhotos={this.setPhotos}
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
