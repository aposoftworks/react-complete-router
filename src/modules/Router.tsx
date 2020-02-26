//Core
import * as React 	    from "react";

//Contexts
import RouterContext    from "../contexts/Router";

//Interfaces
import { iRoute }   from "../interfaces/components";

//Guards
import { buildGuard, printGuard }   from "../helpers/guard";
import defaultBundle                from "../guards";

export default function Router ({basepath = "/", guards = {}, sticky = false, ...props}) {

    //----------------------------
    // Properties
    //----------------------------

    //states
    const [ current, setcurrent ]   = React.useState(window.location.pathname);
	const [ readyguards ]           = React.useState({...defaultBundle, ...guards});
	const [ history, sethistory ]	= React.useState<string[]>([]);

    //----------------------------
    // Callbacks
	//----------------------------

	const onSetCurrent = React.useCallback((newcurrent : string) => {
		const base 		= basepath.replace(/\/$/, "");
		const target 	= newcurrent.replace(/(^\/|\/$)/, "");

		if (base == "" && target == "")
			setcurrent("/");
		else
			setcurrent(base + (target === "" ? "":("/" + target)));
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

	const onProcessBack = React.useCallback(() => {
		let _history 	= history;
		let path 		= _history.pop();

		sethistory(_history);
		onSetCurrent(path || "/");
	}, [current, history]);

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
		if ("/" + window.location.pathname.replace(/(^\/|\/$)/, "") != current) {
			//Update browser
			if (!sticky)
			window.history.pushState("", window.document.title, current);

			//Update internal history
			let _history = history;
			_history.push(current);
			sethistory(_history);
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
		mimic:				onProcessMimic,
		back: 				onProcessBack,
		basepath:			basepath,
    };

    return (
        <RouterContext.Provider value={context}>
            {props.children}
        </RouterContext.Provider>
    );
}
