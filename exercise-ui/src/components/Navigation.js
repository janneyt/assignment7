import React from 'react';
import NavItem from './NavItem.js';

function Navigation ({links, linkNames}) {
    return (
        <nav>
            <ul>
            {links.map((link, i) => <NavItem link={link} name={linkNames[i]} key={i} />)}
            </ul>
        </nav>
    )
}
export default Navigation;