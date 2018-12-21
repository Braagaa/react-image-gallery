import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {PropsRoute} from 'react-router-with-props';
import axios from 'axios';
import randomWords from 'random-words';
import * as R from 'ramda';

import {getFlickrPhotos, cleanFlickrData, nextPage} from './modules/flickr';
import Header from './components/Header/';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import RedirectGallery from './components/RedirectGallery/';

class App extends Component {
    state = {
        isLoading: false,
        searchText: '',
        featuredGalleries: [],
        currentGallery: {}
    };

    changeState = prop => value =>
        this.setState(state => ({...this.state, [prop]: value}));

    setPhotos = params => {
        return Promise.resolve(params)
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
        //.then(R.tap(R.partial(this.changeState('isLoading'), [false])))
            .then(nextPage)
            .then(cleanFlickrData)
            .then(this.setCurrentGallery)
        //.then(R.tap(R.partial(this.changeState('isLoading'), [true])))
            .then(() => console.log(this.state.currentGallery))
            .catch(console.error);
    };

    setSearchTextHandle = this.changeState('searchText');
    setCurrentGallery = this.changeState('currentGallery');

    componentDidMount() {
        return Promise.resolve(randomWords({exactly: 3}))
            .then(R.map(R.pipe(R.objOf('tags'), getFlickrPhotos)))
            .then(axios.all)
            .then(R.tap(console.log))
            .then(R.map(cleanFlickrData))
            .then(this.changeState('featuredGalleries'))
            .catch(console.error);
    };

    render() {
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
                    <Switch>
                        <PropsRoute 
                            exact
                            path="/"
                            featuredGalleries={this.state.featuredGalleries}
                            component={Home}
                        />
                        <Redirect exact from="/gallery" to="/"/>
                        <Route 
                            exact 
                            path="/gallery/:gallery" 
                            component={RedirectGallery}
                        />
                        <PropsRoute 
                            path="/gallery/:gallery/:page"
                            featuredGalleries={this.state.featuredGalleries}
                            isLoading={this.state.isLoading}
                            gallery={this.state.currentGallery}
                            setCurrentGallery={this.setCurrentGallery}
                            setPhotos={this.setPhotos}
                            setNextPage={this.setNextPage}
                            component={GalleryPage}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
