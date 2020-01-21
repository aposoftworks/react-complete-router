//Interfaces
import { iGuardData }   from "../interfaces/helpers";

//Helpers
import { testPath }     from "../helpers/route";

//Check route validation path
export default function path (_arguments : any[] | null, data : iGuardData) : Object | boolean {
    //No path required
    if (!("path" in data.route)) return true;

    //Is exact match
    const exact = data.route["exact"]? data.route["exact"]:false;

    //Validate
    return testPath(data.context["current"] as string, data.route["path"] as string, exact as boolean);
}
