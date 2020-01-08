import React from '../node/react';

//Helpers
import Digital  from '../effects/Digital';
import { Link } from '../distrouter';

export default function Home () {
    

    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="site-home">
            <Digital />
            <div className="site-title">
                <div className="container">
                    <div className="col-12">
                        <img alt="logo" src="logo.png" className="col-md-3" />
                    </div>
                    <h2 className="mt-3">npm i react-complete-router</h2>
                    <Link to="start" className="linkable">How to use it</Link>
                </div>
            </div>
        </div>
    );
}