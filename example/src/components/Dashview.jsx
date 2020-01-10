import React from '../node/react';

//Components
import Navbar from "./Navbar";

export default function Dashview ({title, children}) {


    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="row">
            <div className="col-md-3 p-0">
                <Navbar />
            </div>
            <div className="col-md-9 p-0 pt-4">
                <div className="row">
                    <div className="col-12">
                        <div className="container">
                            {title && <h2 className="col-12">{title}</h2>}
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
