//Core
import * as React 	from "react";

//Contexts
import RouterContext from "../contexts/Router";

//Interfaces
import iRouterContext from "../interfaces/contexts";

export default function Route ({...props}) {

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
        redirect(props.to);
    }, [props]);

    //----------------------------
    // Memos
    //----------------------------
    
    const propclassName = React.useMemo(() => {
        const activable : string | Boolean     = props.active;
        const baseclassname = props.className;

        if (!activable)     return baseclassname? baseclassname:"";
        if (current === props.to) {
            return baseclassname? (baseclassname + " "):"" + (activable === true ? "active":activable);
        }

        return "";
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