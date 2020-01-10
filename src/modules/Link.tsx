//Core
import * as React 	from "react";

//Contexts
import RouterContext from "../contexts/Router";

//Interfaces
import iRouterContext from "../interfaces/contexts";

export default function Link ({...props}) {

    //----------------------------
    // Properties
    //----------------------------

    //contexts
    const { redirect, current } = React.useContext(RouterContext) as iRouterContext;

    //----------------------------
    // Callbacks
    //----------------------------

    const onClick = React.useCallback((event) => {
        //Prevent page reload
        event.preventDefault();

        //Add extra functionality
        if ("onClick" in props) props.onClick(event);

        //Redirect
        redirect(props.to[0] == "/"? props.to:("/" + props.to));
    }, [props]);

    //----------------------------
    // Memos
    //----------------------------

    const propclassName = React.useMemo(() => {
        const activable : string | null | Boolean   = props.active;
		const baseclassname : string | null 		= props.className;

		if (!activable)     return baseclassname? baseclassname:"";

        if (current === props.to) {
            return (baseclassname? (baseclassname + " "):"") + (activable === true ? "active":activable);
        }

        return (baseclassname? (baseclassname + " "):"");
    }, [props, current]);

    //----------------------------
    // Render
    //----------------------------

    const { active, to, className, ...domprop } = props;

    return (
        <a onClick={onClick} href="#" {...domprop} className={propclassName}>
            {props.children}
        </a>
    );
}
