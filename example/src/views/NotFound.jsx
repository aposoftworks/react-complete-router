import React from '../node/react';

//Components
import Digital  from "../effects/Digital";

export default function NotFound (props) {

	console.log(props);

    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="dashview">
            <Digital />
            <h2 className="site-title">Page {props.page} not found</h2>
        </div>
    );
}
