//Core
import * as React 	from "react";

//Contexts
import RouterContext    from "../contexts/Router";

//Interfaces
import iRouterContext   from "../interfaces/contexts";

export default function Switch ({...props}) {

    //----------------------------
    // Properties
    //----------------------------

    //States
    const [ ComponentToRender, setcomponent ] = React.useState();

    //Contexts
    const { processRoute, current, data } = React.useContext(RouterContext) as iRouterContext;

    //----------------------------
    // Effects
    //----------------------------

    React.useEffect(() => {
		const compchildren = React.Children.toArray(props.children);

		//No children to render
		if (compchildren.length == 0) return setcomponent(null);

        for (let i = 0; i < compchildren.length; i++) {
            const child							= compchildren[i];
            const {to, children, ...childprops} = child.props;

            //Check if child is valid
            if (!React.isValidElement(child)) continue;

            //Check if route passes
            const result = processRoute(childprops);
            if (result) {
				const renderable	= to ? to : children;
				const newprops 		= {...childprops, ...(result as Object)};

				if (typeof child.type === "function" && child.type.name == "Route") {
					//Is a component
					if (React.isValidElement(renderable)) return setcomponent (renderable);
					//Is a literal
					else return setcomponent(React.createElement(renderable, newprops));
				}
				else {
					//Is a component
					if (React.isValidElement(child)) return setcomponent (child);
					//Is a literal
					else return setcomponent(React.createElement(child, newprops));
				}
            }
        }

        //No child selected
        return setcomponent(null);
    }, [current, data]);

    //----------------------------
    // Render
    //----------------------------

    return ComponentToRender ? ComponentToRender:null;
}
