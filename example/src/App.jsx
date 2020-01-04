//Core
import React from './node/react';

//Router
import { Router, Route, Switch } from './router';

//Views
import Home 		from "./views/Home";
import Start 		from "./views/Start";
import Components	from "./views/Components";
import Guards		from "./views/Guards";
import Contexts		from "./views/Contexts";
import Extending	from "./views/Extending";
import Contribution	from "./views/Contribution";
import NotFound		from "./views/NotFound";

export default function App () {
	return (
		<Router basetitle="RCR">			
			<Switch>
				<Route path="/" 			to={Home} 			title="" 			/>
				<Route path="/start"		to={Start} 			title="Start"		/>
				<Route path="/components"	to={Components}		title="Components"	/>
				<Route path="/guards"		to={Guards}			title="Guards" 		/>
				<Route path="/contexts"		to={Contexts}		title="Contexts" 	/>
				<Route path="/extending"	to={Extending}		title="Extending"	/>
				<Route path="/contribution"	to={Contribution}	title="Contribution"/>
				<Route 						to={NotFound} 		title="Not found"	/>
			</Switch>
		</Router>
	);
}