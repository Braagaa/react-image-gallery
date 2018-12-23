import React from 'react';
import PropTypes from 'prop-types';

const Err = ({header, message}) => (
    <div className="not-found">
        <span className="material-icons error__icon">warning</span>
        <h3 className="error__title">{header}</h3>
        <p>{message}</p>
    </div>
);

Err.propTypes = {
    header: PropTypes.string,
    message: PropTypes.string
};

export default Err;
