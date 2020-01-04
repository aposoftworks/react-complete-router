import React from '../node/react';

//Components
import Digital  from "../effects/Digital";
import Dashview from "../components/Dashview";

export default function NotFound () {
    

    //----------------------------
    // Render
    //----------------------------

    return (
        <Dashview>
            <Digital />
            <h2 className="site-title">Page not found</h2>
        </Dashview>
    );
}