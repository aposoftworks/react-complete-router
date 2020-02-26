//Interfaces
import { iGuardData } from "../interfaces/helpers";

//Redirect the route if it matches
export default function redirect (_arguments : any[] | null, data : iGuardData) : Object | boolean {
	//Place to redirect
	data.context["redirect"](data.route["redirect"]);

	return true;
}
