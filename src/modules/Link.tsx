//Core
import * as React 	from "react";

//Contexts
import RouterContext from "../contexts/Router";

//Interfaces
import iRouterContext from "../interfaces/contexts";

export default function Link ({to = "/", ...props}) {

    //----------------------------
    // Properties
    //----------------------------

    //contexts
    const { redirect, current } = React.useContext(RouterContext) as iRouterContext;

    //----------------------------
    // Memos
	//----------------------------

	const targetMemo = React.useMemo(() => {
		return "/" + to.replace(/(^\/|\/$)/, "");
	},[to]);

    const propclassName = React.useMemo(() => {
        const activable : string | null | Boolean   = props.active;
		const baseclassname : string | null 		= props.className;

		if (!activable)     return baseclassname? baseclassname:"";

        if (current === targetMemo) {
            return (baseclassname? (baseclassname + " "):"") + (activable === true ? "active":activable);
        }

        return (baseclassname? (baseclassname + " "):"");
    }, [props, current, targetMemo]);

    //----------------------------
    // Callbacks
    //----------------------------

    const onClick = React.useCallback((event) => {
        //Prevent page reload
        event.preventDefault();

        //Add extra functionality
        if ("onClick" in props) props.onClick(event);

        //Redirect
        redirect(targetMemo);
    }, [props, redirect, targetMemo]);

    //----------------------------
    // Render
    //----------------------------

    const { active, className, exact, negate, title, ...domprop } = props;

    return (
        <a {...domprop} onClick={onClick} href="#" className={propclassName}>
            {props.children}
        </a>
    );
}
