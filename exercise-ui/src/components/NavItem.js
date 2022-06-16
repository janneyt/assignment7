import React from 'react';
import {Link} from 'react-router-dom';

function NavItem ({link, name})  {
    return (
        <>
            <li>
                <Link to={link} >{name}</Link>
            </li>
        </>
    )
}
export default NavItem;