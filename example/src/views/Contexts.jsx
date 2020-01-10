import React from '../node/react';

//Packages
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark }                                 from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Contexts () {


    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="dashview">
			<h1>Contexts</h1>

            <p>We offer you access to our router context, so you can redirect, use guards and check the current route inside of it. It's located in:</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`import RouterContext from "react-complete-router/dist/contexts/Router";

//or

import { RouterContext } from "react-complete-router";`}
            </SyntaxHighlighter>

            <p className="mt-4">The data you can access is:</p>

            <ul>
                <li>current: the current url considered by the router</li>
                <li>data: this is are the router props</li>
                <li>redirect: change the current path of the router</li>
                <li>processGuard: if you wish to use our guard system outside of routes, you may do so here</li>
                <li>processRoute: accept the props to run priority and non priority guards</li>
            </ul>
        </div>
    );
}
