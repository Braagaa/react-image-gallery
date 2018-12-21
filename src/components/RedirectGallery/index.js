import React from 'react';
import {Redirect} from 'react-router-dom';

const RedirectGallery = ({match: {params: {gallery}}}) => (
    <Redirect to={`/gallery/${gallery}/1`}/>
);

export default RedirectGallery;
