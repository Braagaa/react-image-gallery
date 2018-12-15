import React from 'react';
import * as R from 'ramda';

import NavItem from './Item';

const Nav = ({galleries}) => (
    <ul className="main-nav">
        {R.map(NavItem, galleries)}
    </ul>
);

export default Nav;
