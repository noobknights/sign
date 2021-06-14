import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Main from "./Main";

export default function Nav() {
	return (
		<Router>
			<Switch>
				<Route path="/main">
					<Main />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}
