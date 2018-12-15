import React from 'react';
import * as R from 'ramda';

import Item from './Item';

const photos = R.pipe(R.prop('photo'), R.map(Item));

const Gallery = ({gallery}) => (
    <div className="photo-container">
        <h2>Results</h2>
        <ul>
            {photos(gallery)}
        </ul>
    </div>
);

export default Gallery;
