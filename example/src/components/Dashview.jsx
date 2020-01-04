import React from '../node/react';

//Components
import Navbar from "./Navbar";

export default function Dashview ({title, children}) {
    

    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="row dashview">
            <div className="col-md-3">
                <Navbar />
            </div>
            <div className="col-md-9 pt-4">
                <div className="row">
                    {title && <h2 className="col-12">{title}</h2>}
                    <div className="col-12">
                        <div className="container">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}