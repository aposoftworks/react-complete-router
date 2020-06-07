import * as React from "react";
import iRouterContext from "./interfaces/contexts";
import _Router from "./modules/Router";
import _Route from "./modules/Route";
import _Link from "./modules/Link";
import _Switch from "./modules/Switch";
export declare const Router: typeof _Router;
export declare const Route: typeof _Route;
export declare const Link: typeof _Link;
export declare const Switch: typeof _Switch;
export declare const RouterContext: React.Context<iRouterContext>;
declare const bundled: {
    Router: typeof _Router;
    Route: typeof _Route;
    Link: typeof _Link;
    Switch: typeof _Switch;
    RouterContext: React.Context<iRouterContext>;
};
export default bundled;
