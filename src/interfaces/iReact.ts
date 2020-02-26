import { FunctionComponent, Props } from "react";

export interface iReactProps extends Props<any> {
	children?   : iReactComponent | any,
  to?         : any,

  //Generic props to allow guards
  [x:string]  : any,
}

export interface iReactComponent extends FunctionComponent {
  props? : iReactProps
}
