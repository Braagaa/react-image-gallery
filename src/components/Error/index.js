import React from 'react';

const Err = ({header, message}) => (
    <div className="not-found">
        <span className="material-icons error__icon">warning</span>
        <h3 className="error__title">{header}</h3>
        <p>{message}</p>
    </div>
);

export default Err;
