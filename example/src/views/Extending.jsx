import React from '../node/react';

//Components
import Dashview from "../components/Dashview";

//Packages
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark }                                 from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Extending () {
    

    //----------------------------
    // Render
    //----------------------------

    return (
        <Dashview title="Extending">
            <p>Here you shall learn how to create your own custom guards and use them.</p>

            <h4>Creating guards</h4>

            <p>Guards are functions that take two parameters, the first one is the guard arguments, and the second one is a object that contains: route props, router props, and router context. Check out an example guard:</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`export default function exampleguard (args, data) {
    //Variables destructuring
    const { router, route, context } = data;

    //do your thing!

    //This will return data that will be bind to the route component child
    if (/*condition*/) return {cooldatahere};

    //this will prevent the route requesting the guard from rendering
    return false;
}`}
            </SyntaxHighlighter>
            
            <h4>Using your guards</h4>

            <p>First thing you will need to do, is to tell your router about it's existance, if the router already contains a guard with this name, it will overwrite it.</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`<Router guards={{exampleguard}}>
    {children}
</Router>`}
            </SyntaxHighlighter>

            <p>And you may now use it in your routes, priority or non priority.</p>

            <SyntaxHighlighter language="jsx" style={dark}>
{`<Route exampleguard />
<Route guard={["exampleguard"]} />`}
            </SyntaxHighlighter>

            <h4>Typescript</h4>

            <p>This package supports typescript, so you may extend your guards from ".tsx" files, they will help you build a stable guard. An example with typescript:</p>
            
            <SyntaxHighlighter language="jsx" style={dark}>
{`export default function when (_arguments : any[] | null, data : iGuardData) : Object | boolean {
    if (!("when" in data.route)) return true;

    return !!data.route["when"];
}`}
            </SyntaxHighlighter>
        </Dashview>
    );
}