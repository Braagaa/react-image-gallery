import React from 'react';

import Nav from '../components/Nav/';
import Err from '../components/Error/'

const ErrorPage = ({header, message, galleries}) => (
    <div>
        <Nav galleries={galleries}/>
        <Err header={header} message={message}/>
    </div>
);

export default ErrorPage;
