//Interfaces
import { iGuardData } from "../interfaces/helpers";

//Check route validation
export default function when (_arguments : any[] | null, data : iGuardData) : Object | boolean {
    //No when required
    if (!("when" in data.route)) return true;

    //Validate
    return !!data.route["when"];
}