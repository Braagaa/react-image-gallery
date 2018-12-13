import React from 'react';

import FeatureItem from './Item';

const Feature = props => (
    <div>
        <h2 className="feature-list__title">Featured Galleries</h2>
        <ul className="feature-list">
            <FeatureItem/>
            <FeatureItem/>
            <FeatureItem/>
        </ul>
    </div>
);

export default Feature;
