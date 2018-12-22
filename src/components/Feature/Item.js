import React from 'react';
import {Link} from 'react-router-dom';

const FeatureItem = ({title, URL, key}) => (
    <li key={key} className="feature-list__item">
        <Link to={`/gallery/${title}/1`} className="feature-list__item__img" 
            style={{background: `url(${URL})`}}>
            {' '}
        </Link>
        <h3 className="feature-list__item__title">{title}</h3>
    </li>
);

export default FeatureItem;
