import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import Pagination from '../../components/Pagination/';
import NoResults from '../../components/NoResults/';
import Item from './Item';

const photos = R.pipe(R.prop('photo'), R.map(Item));

const Gallery = ({gallery, setPage, setNextPage, history}) => {
    return gallery.photo.length ? (
        <div className="photo-container">
            <h2>{gallery.tags}</h2>
            <Pagination 
                gallery={gallery} 
                setPage={setPage}
                setNextPage={setNextPage}
                history={history}
            />
            <ul className="photo-list">
                {photos(gallery)}
            </ul>
            <Pagination 
                gallery={gallery} 
                setPage={setPage}
                setNextPage={setNextPage}
                history={history}
            />
        </div>
    ) : (
        <div className="photo-container">
            <NoResults/>
        </div>
    );
};

Gallery.propTypes = {
    gallery: PropTypes.object,
    history: PropTypes.object,
    setPage: PropTypes.func,
    setNextPage: PropTypes.func
};

export default Gallery;
