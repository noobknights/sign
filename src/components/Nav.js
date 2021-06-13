import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { PlayArrow, ExitToApp } from "@material-ui/icons";
import Home from "./Home";
import Main from "./Main";

export default function Nav(props) {
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
