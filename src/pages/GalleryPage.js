import React from 'react';

import Nav from '../components/Nav';
import Gallery from '../components/Gallery';

const GalleryPage = ({featuredGalleries, gallery}) => (
    <div>
        <Nav galleries={featuredGalleries}/>
        <Gallery gallery={gallery}/>
    </div>
);

export default GalleryPage;
