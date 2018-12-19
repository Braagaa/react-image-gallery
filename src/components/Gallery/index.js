import React from 'react';
import * as R from 'ramda';

import Pagination from '../../components/Pagination/';
import Item from './Item';

const photos = R.pipe(R.prop('photo'), R.map(Item));

const Gallery = ({gallery, setPage, setNextPage}) => (
    <div className="photo-container">
        <h2>{gallery.tags}</h2>
        <Pagination 
            gallery={gallery} 
            setPage={setPage}
            setNextPage={setNextPage}
        />
        <ul className="photo-list">
            {photos(gallery)}
        </ul>
        <Pagination 
            gallery={gallery} 
            setPage={setPage}
            setNextPage={setNextPage}
        />
    </div>
);

export default Gallery;
