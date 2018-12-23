import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as R from 'ramda';

const getId = R.pipe(R.head, R.prop('id'));

const Item = ({tags, photo}) => (
    <li key={getId(photo)}>
        <Link to={`/gallery/${tags}/1`}>{tags}</Link>
    </li>
);

Item.propTypes = {
    tags: PropTypes.string,
    photo: PropTypes.array
};

export default Item;
