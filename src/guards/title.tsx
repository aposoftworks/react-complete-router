//Interfaces
import { iGuardData } from "../interfaces/helpers";

//When this route is applied, it will insert the title into the browser
//Be careful to not stack this guard, since one will override another
export default function title (_arguments : any[] | null, data : iGuardData) : Object | boolean {
    const basetitle 		= data.router["basetitle"];
	const subtitle  		= data.route["title"];
	const basetitlestring 	= Array.isArray(basetitle) ? basetitle[0]:basetitle;
	const midtitlestring	= Array.isArray(basetitle) ? basetitle[1]:"-";

    //Update page title
    if (basetitle && subtitle)  document.title = basetitlestring + midtitlestring + subtitle;
    else if (basetitle)         document.title = basetitlestring;
    else                        document.title = subtitle;

    //No need of blocking
    return true;
}
