import React from 'react';

import Feature from '../components/Feature/';
import Error from '../components/Error/';
import Loading from '../components/Loading';

const Home = props => props.isLoading ? (
    <Loading/>
) : !props.isError ? (
    <div className="main__wrapper">
        <Feature {...props}/>
    </div>
) : (
    <Error
        header="Connection Error"
        message="Could not retreive featured galleries at this time."
    />
);

export default Home;
