//Core
import * as React 	    from "react";

//Contexts
import RouterContext    from "../contexts/Router";

//Interfaces
import { iRoute }   from "../interfaces/components";

//Guards
import { buildGuard, printGuard }   from "../helpers/guard";
import defaultBundle                from "../guards";

export default function Router ({basepath = "/", guards = {}, ...props}) {

    //----------------------------
    // Properties
    //----------------------------

    //states
    const [ current, setcurrent ]   = React.useState(window.location.pathname);
    const [ readyguards ]           = React.useState({...defaultBundle, ...guards});

    //----------------------------
    // Callbacks
	//----------------------------

	const onSetCurrent = React.useCallback((newcurrent : string) => {
		setcurrent(basepath + newcurrent.replace(/(^\/|\/$)/, ""));
	}, [setcurrent]);

	const onProcessMimic = React.useCallback((_guard : string, data : Object = {}) : Object | boolean => {
		//Build guard
		const guard = buildGuard(_guard);

		//Guard available
		if (guard.name in readyguards) {
			return readyguards[guard.name](guard.arguments, {data, router: props, context});
		}

		//No guard available
		return false;
	}, [props, readyguards, current]);

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

    const handleHash = React.useCallback((event) => {
        //Prevent page reload
		event.preventDefault();

		const path = window.location.pathname.replace(/(^\/|\/$)/, "");

        if ("/" + path != current) {
            onSetCurrent(window.location.pathname);
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
    }, [current]);

    React.useEffect(() : void => {
        //Update browser
        if ("/" + window.location.pathname.replace(/(^\/|\/$)/, "") != current) {
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
        redirect:           onSetCurrent,
		data:               props,
		mimic:				onProcessMimic
    };

    return (
        <RouterContext.Provider value={context}>
            {props.children}
        </RouterContext.Provider>
    );
}
