//Core
import * as React       from "react";

//Interfaces
import iRouterContext 	from "../interfaces/contexts";
import { iRoute }       from "../interfaces/components";

//Dumb data
const dumbdata = {
    data: {},
	current:"/",
	basepath:"/",
    processRoute: (data : iRoute) : boolean | Object => !data,
    redirect: (data : string) : void => {data;}
};

const RouterContext = React.createContext(dumbdata as iRouterContext) as React.Context<iRouterContext>;

export default RouterContext;
