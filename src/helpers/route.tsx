//Test if the current path passes
export function testPath (current : string, path : string, exact : boolean = true) : Object | boolean {
    //Paths
    const splitpath     = path.split("/").filter( value => value !== "");
    const splitcurrent  = current.split("/").filter( value => value !== "");

    //Data
	let data    = {};

    //Match root
    if (splitpath.length == 0 && splitcurrent.length != 0 && exact) return false;

    //Loop all parts of the route
    for (let i = 0; i < splitpath.length; i++) {
        //Is a data compartiment
        if (splitpath[i].match(/\{\S+\}/)) {
			const name 		= splitpath[i].replace(/\{/, "").replace(/\}/,"");
			const optional	= name.match(/\?$/);

			//Add only if exists
			if (splitcurrent[i]) {
				data[name] = splitcurrent[i];
			}
			else if (!optional) {
				return false;
			}
        }
        //Equivalent match
        else {
            //Current ends earlier
            if (!splitcurrent[i]) return false;
            //Part matches
            if (splitpath[i] !== splitcurrent[i]) return false;
        }
	}

	//Check extra
	if (splitpath.length < splitcurrent.length && exact) return false;

    //Route matches
    return data;
}
