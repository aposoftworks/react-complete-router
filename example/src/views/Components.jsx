import React from '../node/react';

//Packages
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark }                                 from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Components () {


    //----------------------------
    // Render
    //----------------------------

    return (
        <div className="dashview">
			<h1>Components</h1>

            <h3>Router</h3>

            <p>Being the main component of the entire library, this starts the context, so it should come before all other components.</p>

			<h5>Props (including guards)</h5>

			<ul>
				<li>sticky - let's you work with an independent history, disabling the browser's sync</li>
				<li>basetitle - When using the native title guard on a route, this works as a base title to your browser bar</li>
				<li>guards - an array of the guards available to this router, you can overwrite native guards with this</li>
				<li>basepath - the path compared to the browser's url</li>
			</ul>

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

			<h5>Props (including guards)</h5>

			<ul>
				<li>path - guard that indicates what the current path should be like to this route be displayed, works with exact prop</li>
				<li>title - a guard that sets the browser page title if this route renders</li>
				<li>guest/logged - guard that checks if a user prop is null/false on the router</li>
				<li>when - this guard will prevent it from being rendered if the value passed to it is false</li>
				<li>redirect - will redirect the browser if this route passes</li>
			</ul>

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

            <p>This is the default way of changing the url, but you also may use the redirect function from the router context. Links do not support guards!</p>

			<h5>Props</h5>

			<ul>
				<li>onClick - Called when you click it's contents</li>
				<li>active - The value of active will be bind into the html's class if it matches the route</li>
				<li>to - The place that this will redirect to.</li>
			</ul>

            <SyntaxHighlighter language="jsx" style={dark}>
{`import { Link } from "react-complete-router";

<Link to="/">Home</Link>
<Link to="/about">About</Link>
`}
            </SyntaxHighlighter>
        </div>
    );
}
