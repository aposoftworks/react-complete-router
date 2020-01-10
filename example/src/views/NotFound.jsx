import React from '../node/react';

//Components
import Digital  from "../effects/Digital";

export default function NotFound () {


    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="dashview">
            <Digital />
            <h2 className="site-title">Page not found</h2>
        </div>
    );
}
