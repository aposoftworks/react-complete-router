import React from '../node/react';
import { Link } from '../router';

export default function Navbar () {

    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="sidebar p-4">
            <h4>RCR</h4>

            <div className="sidebar-links">
                <Link active to="/">Home</Link>
                <Link active to="/start">How to start</Link>
                <Link active to="/components">Components</Link>
                <Link active to="/guards">Guards</Link>
                <Link active to="/contexts">Contexts</Link>
                <Link active to="/extending">Extending</Link>
                <Link active to="/contribution">Contribution</Link>
            </div>
        </div>
    );
}