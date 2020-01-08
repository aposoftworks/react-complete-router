import React from '../node/react';
import { Link } from '../distrouter';

export default function Navbar () {

    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="sidebar p-4">
            <h4>RCR</h4>

            <div className="sidebar-links">
                <Link active className="link" to="/">Home</Link>
                <Link active className="link" to="/start">How to start</Link>
                <Link active className="link" to="/components">Components</Link>
                <Link active className="link" to="/guards">Guards</Link>
                <Link active className="link" to="/contexts">Contexts</Link>
                <Link active className="link" to="/extending">Extending</Link>
                <Link active className="link" to="/contribution">Contribution</Link>
            </div>
        </div>
    );
}
