import React from 'react';

import Header from '../components/Header/';
import Feature from '../components/Feature/';

const Home = props => (
    <div className="main__wrapper">
        <Header/>
        <Feature {...props}/>
    </div>
);

export default Home;
