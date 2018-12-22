import React from 'react';
import {Link} from 'react-router-dom';
import * as R from 'ramda';

const getId = R.pipe(R.head, R.prop('id'));

const Item = ({tags, photo}) => (
    <li key={getId(photo)}>
        <Link to={`/gallery/${tags}/1`}>{tags}</Link>
    </li>
);

export default Item;
