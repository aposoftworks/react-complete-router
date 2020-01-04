//Interfaces
import { iGuardData } from "../interfaces/helpers";

//When this route is applied, it will insert the title into the browser
//Be careful to not stack this guard, since one will override another
export default function title (_arguments : any[] | null, data : iGuardData) : Object | boolean {
    const basetitle = data.router["basetitle"];
    const subtitle  = data.route["title"];

    //Update page title
    if (basetitle && subtitle)  document.title = basetitle + " - " + subtitle;
    else if (basetitle)         document.title = basetitle;
    else                        document.title = subtitle;

    //No need of blocking
    return true;
}