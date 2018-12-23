import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import NavItem from './Item';

const Nav = ({galleries}) => (
    <ul className="main-nav">
        {R.map(NavItem, galleries)}
    </ul>
);

Nav.propTypes = {
    galleries: PropTypes.array
};

export default Nav;
