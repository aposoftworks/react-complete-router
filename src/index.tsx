// General
import * as React 		from "react";
import iRouterContext 	from "./interfaces/contexts";

// Modules components
import _Router			from "./modules/Router";
import _Route 			from "./modules/Route";
import _Link 			  from "./modules/Link";
import _Switch 			from "./modules/Switch";

// Contexts imports
import _RouterContext 	from "./contexts/Router";

// Separated components
export const Router 		= _Router;
export const Route 			= _Route;
export const Link 			= _Link;
export const Switch 		= _Switch;

// Contexts
export const RouterContext : React.Context<iRouterContext> = _RouterContext;

// Bundled
const bundled = {
	// Components
	Router: 	_Router,
	Route: 		_Route,
	Link: 		_Link,
	Switch: 	_Switch,

	// Contexts
	RouterContext: _RouterContext,
};

export default bundled;
