import React from 'react';

import {applyRandomAnimation} from '../../modules/randomAnimatecss';

//Gallery Item
const Item = ({URL, title, id}) => (
    <li key={id} onMouseOver={applyRandomAnimation} className="gallery__item">
        <img src={URL} alt={title}/>
    </li>
);

export default Item;
