import React from 'react';
import PropTypes from 'prop-types';

import Nav from '../components/Nav/';
import Err from '../components/Error/'

const ErrorPage = ({header, message, galleries}) => (
    <div>
        <Nav galleries={galleries}/>
        <Err header={header} message={message}/>
    </div>
);

ErrorPage.propTypes = {
    galleries: PropTypes.array,
    header: PropTypes.string,
    message: PropTypes.string
};

export default ErrorPage;
