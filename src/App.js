import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {PropsRoute} from 'react-router-with-props';
import axios from 'axios';
import randomWords from 'random-words';
import * as R from 'ramda';

import {getFlickrPhotos, cleanFlickrData, nextPage} from './modules/flickr';
import Header from './components/Header/';
import RedirectGallery from './components/RedirectGallery/';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import ErrorPage from './pages/ErrorPage';

class App extends Component {
    state = {
        error: false,
        isLoading: false,
        featuredLoading: false,
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
            .then(R.tap(R.partial(this.changeState('error'), [false])))
            .then(cleanFlickrData)
            .then(this.changeState('currentGallery'))
            .then(R.partial(this.changeState('searchText'), ['']))
            .then(R.partial(this.changeState('isLoading'), [true]))
            .catch(this.errorState);
    };

    setNextPage = num => {
        const params = {tags: this.state.currentGallery.tags, page: num}

        return Promise.resolve(params)
            //.then(R.tap(R.partial(this.changeState('isLoading'), [false])))
            .then(nextPage)
            .then(R.tap(R.partial(this.changeState('error'), [false])))
            .then(cleanFlickrData)
            .then(this.setCurrentGallery)
            //.then(R.tap(R.partial(this.changeState('isLoading'), [true])))
            .catch(this.errorState);
    };

    setSearchTextHandle = this.changeState('searchText');
    setCurrentGallery = this.changeState('currentGallery');

    errorState = R.pipe(
        R.tap(console.error),
        R.partial(this.changeState('error'), [true]),
    );

    componentDidMount() {
        return Promise.resolve(randomWords({exactly: 3}))
            .then(R.map(R.pipe(R.objOf('tags'), getFlickrPhotos)))
            .then(R.tap(R.partial(this.changeState('featuredLoading'), [true])))
            .then(axios.all)
            .then(R.tap(R.partial(this.changeState('featuredLoading'), [false])))
            .then(R.map(cleanFlickrData))
            .then(this.changeState('featuredGalleries'))
            .catch(this.errorState);
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
                            isError={this.state.error}
                            isLoading={this.state.featuredLoading}
                            component={Home}
                        />
                        <Redirect exact from="/gallery" to="/"/>
                        <Route 
                            exact 
                            path="/gallery/:gallery" 
                            component={RedirectGallery}
                        />
                        <PropsRoute 
                            exact
                            path="/gallery/:gallery/:page"
                            featuredGalleries={this.state.featuredGalleries}
                            isLoading={this.state.isLoading}
                            gallery={this.state.currentGallery}
                            isError={this.state.error}
                            setCurrentGallery={this.setCurrentGallery}
                            setPhotos={this.setPhotos}
                            setNextPage={this.setNextPage}
                            component={GalleryPage}
                        />
                        <PropsRoute
                            component={ErrorPage}
                            galleries={this.state.featuredGalleries}
                            header="404 Error"
                            message={"Page Not Found"}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
