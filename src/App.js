import React, { Component } from 'react';
import axios from 'axios';
import randomWords from 'random-words';
import * as R from 'ramda';

import {getFlickrPhotos, cleanFlickrData} from './modules/flickr';
import Home from './pages/Home';

class App extends Component {
    state = {
        featuredGalleries: []
    };

    changeState = prop => value =>
        this.setState(state => ({...this.state, [prop]: value}));

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
            <Home featuredGalleries={this.state.featuredGalleries}/>
        );
    }
}

export default App;
