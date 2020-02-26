import * as React from "react";

//Async views import
const bundle = {
	Home: 			React.lazy(() => import("./Home")),
	Start: 			React.lazy(() => import("./Start")),
	Guards: 		React.lazy(() => import("./Guards")),
	Extending: 		React.lazy(() => import("./Extending")),
	Contribution: 	React.lazy(() => import("./Contribution")),
	Contexts: 		React.lazy(() => import("./Contexts")),
	Components: 	React.lazy(() => import("./Components")),
	NotFound: 		React.lazy(() => import("./NotFound")),
};

export default bundle;
