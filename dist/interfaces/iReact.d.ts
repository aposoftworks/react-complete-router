import { FunctionComponent, Props } from "react";
export interface iReactProps extends Props<any> {
    children?: iReactComponent | any;
    to?: any;
    [x: string]: any;
}
export interface iReactComponent extends FunctionComponent {
    props?: iReactProps;
}
