import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { List } from './pages/teams/list/List';
import { Leagues } from './pages/Leagues';
import { Matches } from './pages/Matches';
import { Statistics } from './pages/Statistics';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Page404 } from './pages/error/Page404';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Profile } from "./pages/administration/Profile";
import { ConfirmEmail } from "./pages/auth/ConfirmEmail";
import { Detail } from './pages/teams/detail/Detail';

export function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={HomePage}/>
			<Route path="/teams/:id_team" exact component={Detail} />
            <Route path="/teams" exact component={List} />
			<Route path="/leagues" exact component={Leagues}/>
			<Route path="/matches" exact component={Matches}/>
			<Route path="/statistics" exact component={Statistics} />
			<Route path="/aboutus" exact component={AboutUs}/>
			<Route path="/contact" exact component={Contact}/>
			<Route path="/login" exact component={Login} />
            <Route path="/statistics" exact component={Statistics} />
            <Route path="/register" exact component={Register} />
            <Route path="/administration/profile" exact component={Profile} />
			<Route path="/confirmEmail/:id_user/:hash" exact component={ConfirmEmail} />
			<Route path="*" component={Page404}/>
		</Switch>
	);
}