import React from 'react';
import PropTypes from 'prop-types';
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

FeatureItem.propTypes = {
    key: PropTypes.string,
    title: PropTypes.string,
    URL: PropTypes.string
};

export default FeatureItem;
