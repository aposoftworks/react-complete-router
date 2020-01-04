//Core
import * as React 	    from "react";

//Contexts
import RouterContext    from "../contexts/Router";

//Interfaces
import { iRoute }   from "../interfaces/components";

//Guards
import { buildGuard, printGuard }   from "../helpers/guard";
import defaultBundle                from "../guards";

export default function Router ({basepath = window.location.pathname, guards = {}, ...props}) {

    //----------------------------
    // Properties
    //----------------------------

    //states
    const [ current, setcurrent ]   = React.useState(basepath);
    const [ readyguards ]           = React.useState({...defaultBundle, ...guards});

    //----------------------------
    // Callbacks
    //----------------------------

    const onProcessRoute = React.useCallback((data : iRoute) : Object | boolean => { 
        //Remove reserved props
        const { to, guard, ...clearedProps } = data;
        
        //Check priority guards
        const prioritydata = onProcessGuard(guard, data);
        if (!prioritydata) return false;

        //Check non priority guards
        const nonprioritydata = onProcessGuard(printGuard(clearedProps), data, false);
        if (!nonprioritydata) return false;

        //Route matches
        return {...(prioritydata as Object),...(nonprioritydata as Object)};
    }, [current, props]);

    const onProcessGuard = React.useCallback((guards : string[]|string|undefined, route : iRoute, priority : boolean = true) : Object | boolean => {
        //Props that will be filled to the route by the end of the process
        let data = {};
        
        //Guard check not necessary
        if (guards === undefined) return true;

        //Validate guards
        const _guards : string[] = Array.isArray(guards)? (guards as string[]):[guards as string];

        //Loop guards
        for (let i = 0; i < _guards.length;i++) {
            //Build guard
            const guard = buildGuard(_guards[i]);

            //Guard available
            if (guard.name in readyguards) {
                const response = readyguards[guard.name](guard.arguments, {route, router: props, context});

                //Guard fail
                if (!response) return false;

                //Fill data
                if (typeof response === "object") data = {...data, ...response};
            }
            else if (priority) {
                console.warn("Requested guard [" + _guards[i] + "] was not found.");
            }
        }

        //All guards passes
        return data;
    }, [current, props]);

    const onRedirect = React.useCallback((newpath : string) : void => {
        setcurrent(newpath);
    }, [current]);

    const handleHash = React.useCallback((event) => {
        event.preventDefault();

        console.log("Update page to " + window.location.pathname);

        if (window.location.pathname != current) {
            setcurrent(window.location.pathname);
        }
    }, [current]);
    
    //----------------------------
    // Effects
    //----------------------------

    //Event binding
    React.useEffect(() => {
        window.addEventListener("popstate", handleHash, false);

        //Unbind
        return () => {
            document.removeEventListener("hashchange", handleHash, false);
        };
    }, []);

    React.useEffect(() : void => {
        //Update browser
        if (window.location.pathname != current) {
            window.history.pushState("", window.document.title, current);
        }
    }, [current]);

    //----------------------------
    // Render
    //----------------------------

    const context = {
        current:            current,
        processRoute:       onProcessRoute,
        processGuard:       onProcessGuard,
        redirect:           onRedirect,
        data:               props,
    };

    return (
        <RouterContext.Provider value={context}>
            {props.children}
        </RouterContext.Provider>
    );
}