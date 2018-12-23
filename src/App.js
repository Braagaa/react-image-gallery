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

    /**
     * Used for the search-bar. Fetches data from Flickr, abstracts and 
     * cleans the data, then sets the currentGallery state with it.
     */
    setPhotos = params => {
        return Promise.resolve(params)
            //tirggers Loading component
            .then(R.tap(R.partial(this.changeState('isLoading'), [false]))) 
            .then(getFlickrPhotos)
            //if there was previous error this would stop it and allow
            //the program to run normally
            .then(R.tap(R.partial(this.changeState('error'), [false])))
            .then(cleanFlickrData)
            .then(this.changeState('currentGallery'))
            .then(R.partial(this.changeState('searchText'), ['']))
            //stops the Loading component
            .then(R.partial(this.changeState('isLoading'), [true]))
            .catch(this.errorState);
    };

    /**
     * Used for the pagination of pages. Fetches a specific page of a 
     * search on Flickr's API, abstracts and cleans the data, and sets the
     * currentGallery state with it.
     *
     * NOTE: Read setPhotos for similar reasoning of 'isLoading' and 'error'
     *
     * NOTE: If you want to the Loading component to render while 
     *       navagating between pages, uncomment the comments below. It 
     *       doesn't look good and if something does happen, the Err
     *       component should render anyways.
     */
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

    /**
     * Used for the Home page. Randomly retrieves 3 words, fecthes data for
     * each word on Flickr's API with it, abstracts and cleans the result, 
     * and sets the featuredGalleries state with it.
     *
     * NOTE: A seperate bool state was needed to tell when data was being
     *       fetched so then the Loading component can render
     *       (featuredGalleries vs isLoading). This was needed so a 
     *       conflict wouldn't arise when both featuredGalleries and 
     *       currentGallery data were being obtained at the same time. If
     *       they were to share the same isLoading state, errors might arise
     *       and produce unwanted results.
     */
    componentDidMount() {
        return Promise.resolve(randomWords({exactly: 3}))
            .then(R.map(R.pipe(R.objOf('tags'), getFlickrPhotos)))
            //same as isLoading state but for featuredGalleries
            .then(R.tap(R.partial(this.changeState('featuredLoading'), [true])))
            .then(axios.all)
            //same as isLoading state but for featuredGalleries
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
