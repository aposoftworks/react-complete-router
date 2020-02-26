//Core
import * as React 	    from "react";

//Contexts
import RouterContext    from "../contexts/Router";
import iRouterContext   from "../interfaces/contexts";

//Interfaces
import { iRoute } 		from "../interfaces/components";
import { iReactProps }	from "../interfaces/iReact";

export default function Route ({children, to = () => null, ...props} : iReactProps) {

    //----------------------------
    // Properties
    //----------------------------

    //contexts
    const { processRoute, current, data }  = React.useContext(RouterContext) as iRouterContext;

    //----------------------------
    // Memos
    //----------------------------

    const Component = React.useCallback(() : JSX.Element | null => {
        const response = processRoute(props as iRoute);

        if (response) {
			//Route passes to prop to
			if (to !== null) {
				return React.createElement(to, {...props, ...(response as Object)});
			}
			//Route passes to children
			if (children !== null) {
				return React.createElement(children, {...props, ...(response as Object)});
			}
		}

        //Route not passes
        return null;
    }, [current, data]);

    //----------------------------
    // Render
    //----------------------------

    return <Component />;
}
