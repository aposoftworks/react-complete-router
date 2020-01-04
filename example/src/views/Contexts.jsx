import React from '../node/react';

//Components
import Dashview from "../components/Dashview";

//Packages
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark }                                 from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Contexts () {
    

    //----------------------------
    // Render
    //----------------------------

    return (
        <Dashview title="Contexts">
            <p>We offer you access to our router context, so you can redirect, use guards and check the current route inside of it. It's located in:</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`import RouterContext from "react-complete-router/dist/contexts/Router";

//or

import { RouterContext } from "react-complete-router";`}
            </SyntaxHighlighter>
            
            <p>The data youcan access is:</p>

            <ul>
                <li>current: the current url considered by the router</li>
                <li>data: this is are the router props</li>
                <li>redirect: change the current path of the router</li>
                <li>processGuard: if you wish to use our guard system outside of routes, you may do so here</li>
                <li>processRoute: accept the props to run priority and non priority guards</li>
            </ul>
        </Dashview>
    );
}