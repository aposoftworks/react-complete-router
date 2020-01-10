//Core
import React from './node/react';

//Router
import { Router, Switch, Route } from './router';

//Views
import Views 	from "./views";
import Home 	from "./views/Home";

//Components
import Dashview 	from "./components/Dashview";

export default function App () {
	return (
		<Router basetitle="RCR">
			<Switch>
				<Route path="/" to={Home} title="" />

				<Dashview>
					<React.Suspense fallback={<h1 className="loading">Loading</h1>}>
						<Switch>
							<Route path="/start"			to={Views.Start} 			title="Start"		/>
							<Route path="/components"		to={Views.Components}		title="Components"	/>
							<Route path="/guards"			to={Views.Guards}			title="Guards" 		/>
							<Route path="/contexts"			to={Views.Contexts}			title="Contexts" 	/>
							<Route path="/extending"		to={Views.Extending}		title="Extending"	/>
							<Route path="/contribution"		to={Views.Contribution}		title="Contribution"/>
							<Router 						to={Views.NotFound} 		title="Not found"	/>
						</Switch>
					</React.Suspense>
				</Dashview>
			</Switch>
		</Router>
	);
}
