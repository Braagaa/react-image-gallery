import React from 'react';

import Nav from '../components/Nav';
import Gallery from '../components/Gallery';
import Pagination from '../components/Pagination';

const GalleryPage = props => (
    <div>
        <Nav galleries={props.featuredGalleries}/>
        <Gallery 
            gallery={props.gallery} 
            setPage={props.setPage} 
            setNextPage={props.setNextPage}
        />
    </div>
);

export default GalleryPage;
