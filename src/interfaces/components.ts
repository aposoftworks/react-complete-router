import { iReactComponent } from "./iReact";

export interface iRoute {
    guard?    : string[]|string,
    to?       : JSX.Element,
    children? : iReactComponent | any
}

export interface iRouter {

}
