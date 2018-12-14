import React from 'react';
import * as R from 'ramda';

import FeatureItem from './Item';

const photoProp = R.pipe(
    R.prop, 
    R.append(R.__, [R.prop('photo'), R.head]), 
    R.apply(R.pipe)
);

const neededProps = R.applySpec({
    key: photoProp('id'),
    title: R.prop('tags'),
    URL: photoProp('URL')
});

const Feature = ({featuredGalleries}) => (
    <div>
        <h2 className="feature-list__title">Featured Galleries</h2>
        <ul className="feature-list">
            {R.map(R.pipe(neededProps, FeatureItem), featuredGalleries)}
        </ul>
    </div>
);

export default Feature;
