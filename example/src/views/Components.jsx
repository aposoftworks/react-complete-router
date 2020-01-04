import React from '../node/react';

//Components
import Dashview from "../components/Dashview";

//Packages
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark }                                 from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Components () {
    

    //----------------------------
    // Render
    //----------------------------

    return (
        <Dashview title="Components">
            <h3>Router</h3>

            <p>Being the main component of the entire library, this starts the context, so it should come before all other components.</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`import { Router } from "react-complete-router";

export default function App ({children}) {
    return (
        <Router>
            {children}
        </Router>
    );
}`}
            </SyntaxHighlighter>
            
            <h3>Route</h3>

            <p>The main way to separate routes, this is the most powerful component here.</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`import { Route } from "react-complete-router";

<Route path="/" to={<h1>Home</h1>} />
<Route path="/about" to={<h1>About</h1>} />
`}
            </SyntaxHighlighter>
            
            <h3>Switch</h3>

            <p>Have a list of routes that require only one of them to render at the time? So this is for you.</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`import { Switch } from "react-complete-router";

<Switch>
    <Route path="/" to={<h1>Home</h1>} logged />
    <Route to={<h1>Not found</h1>} />
</Switch>
`}
            </SyntaxHighlighter>
            
            <h3>Link</h3>

            <p>This is the default way of changing the url, but you also may use the redirect function from the router context.</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`import { Link } from "react-complete-router";

<Link to="/">Home</Link>
<Link to="/about">About</Link>
`}
            </SyntaxHighlighter>
        </Dashview>
    );
}