import React from 'react';
import PropTypes from 'prop-types';

import Feature from '../components/Feature/';
import Error from '../components/Error/';
import Loading from '../components/Loading';

const Home = props => props.isError ? (
    <Error
        header="Connection Error"
        message="Could not retreive featured galleries at this time."
    />
) : props.isLoading ? (
    <Loading/>
) : (
    <div className="main__wrapper">
        <Feature featuredGalleries={props.featuredGalleries}/>
    </div>
);

Home.propTypes = {
    featuredGalleries: PropTypes.array,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool
};

export default Home;
