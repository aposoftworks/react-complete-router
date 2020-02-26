//Core
import * as React 	from "react";

//Contexts
import RouterContext    from "../contexts/Router";

//Interfaces
import iRouterContext                     from "../interfaces/contexts";
import { iReactProps, iReactComponent } 	from "../interfaces/iReact";
import { iRoute }                         from "../interfaces/components";

export default function Switch ({...props} : iReactProps) {

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
            const child							            = compchildren[i] as iReactComponent;
            const {to, children, ...childprops} = child.props as iRoute;

            //Check if child is valid
            if (!React.isValidElement(child)) continue;

            //Check if route passes
            const result = processRoute(childprops);
            if (result) {
				const renderable	= to ? to : (children);
				const newprops 		= {...childprops, ...(result as Object)};

				if (typeof child.type === "function" && child.type.name == "Route") {
					//Is a component
					if (React.isValidElement(renderable)) return setcomponent (React.cloneElement(renderable, {...(renderable.props as Object),...newprops} as React.Attributes));
					//Is a literal
					else return setcomponent(React.createElement(renderable, newprops));
				}
				else {
					//Is a component
					if (React.isValidElement(child)) return setcomponent (React.cloneElement(child, {...(child.props as Object),...newprops} as React.Attributes));
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
