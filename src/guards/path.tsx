//Interfaces
import { iGuardData }   from "../interfaces/helpers";

//Helpers
import { testPath }     from "../helpers/route";

//Check route validation path
export default function path (_arguments : any[] | null, data : iGuardData) : Object | boolean {
    //No path required
    if (!("path" in data.route)) return true;

	//Is exact match
	const negate	= data.route["negate"]?data.route["negate"]:false;
	const exact 	= data.route["exact"]? data.route["exact"]:false;
	const current 	= "/" + (data.context["basepath"] as string).replace(/(^\/|\/$)/, "") + "/" + (data.context["current"] as string).replace(/^\//, "");

    //Validate
    return testPath(current, data.route["path"] as string, exact as boolean, negate as boolean);
}
