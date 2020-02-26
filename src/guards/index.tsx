//Guard functions
import _guest   	from "./guest";
import _logged  	from "./logged";
import _when    	from "./when";
import _path    	from "./path";
import _title   	from "./title";
import _redirect	from "./redirect";

//Separated export
export const guest  	= _guest;
export const logged 	= _logged;
export const when   	= _when;
export const path   	= _path;
export const title  	= _title;
export const redirect	= _redirect;

//Bundle of default guards
const bundle = {
    guest:  	_guest,
    logged: 	_logged,
    when:   	_when,
    path:   	_path,
	title:  	_title,
	redirect: 	_redirect,
};

export default bundle;
