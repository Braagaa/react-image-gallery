import React from 'react';

const FeatureItem = ({title, URL, key}) => (
    <li key={key} className="feature-list__item">
        <a className="feature-list__item__img" 
            style={{background: `url(${URL})`}}>
            {' '}
        </a>
        <h3 className="feature-list__item__title">{title}</h3>
    </li>
);

export default FeatureItem;
