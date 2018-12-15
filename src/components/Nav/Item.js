import React from 'react';
import * as R from 'ramda';

const getId = R.pipe(R.head, R.prop('id'));

const Item = ({tags, photo}) => (
    <li key={getId(photo)}><a href="www.example.com">{tags}</a></li>
);

export default Item;
