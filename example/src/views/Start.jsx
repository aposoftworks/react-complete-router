import React from '../node/react';

//Components
import Dashview from "../components/Dashview";

//Packages
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark }                                 from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Start () {
    

    //----------------------------
    // Render
    //----------------------------

    return (
        <Dashview title="How to use it">
            <p>React Complete Router (or RCR as we are going to refer it here) is a react router that aims to be the last thing you will ever need to get, so for that we aimed for extensibility, meaning that you can reimplement behaviours and fit it in any case scenario without changing the source code.</p>

            <h3>Installing</h3>

            <h4>NPM</h4>

            <SyntaxHighlighter language="bash" style={dark}>
                npm i react-complete-router --save
            </SyntaxHighlighter>

            <h4>Github</h4>

            <SyntaxHighlighter language="bash" style={dark}>
            npm i git+https://github.com/aposoftworks/react-complete-router.git
            </SyntaxHighlighter>

            <h4>Usage</h4>

            <SyntaxHighlighter language="jsx" style={dark}>
            {
`import * as React			from 'react';

import { Router, Route } 	from 'react-complete-router';

export default function App () {
    return (
        <Router>
            <Route to={<h1>Home</h1>} path="/">
            <Route to={<h1>About</h1>} path="/about">
        </Router>
    );
}`}
            </SyntaxHighlighter>
        </Dashview>
    );
}