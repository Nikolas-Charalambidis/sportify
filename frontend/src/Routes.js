import React from 'react';
import {Route, Switch} from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { Teams } from './pages/Teams';
import { Leagues } from './pages/Leagues';
import { Fixtures } from './pages/Fixtures';
import { Statistics } from './pages/Statistics';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Page404 } from './pages/error/Page404';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from "./pages/Profile";
import { ConfirmEmail } from "./pages/ConfirmEmail";

export function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={HomePage}/>
			<Route path="/tymy" exact component={Teams}/>
			<Route path="/souteze" exact component={Leagues}/>
			<Route path="/zapasy" exact component={Fixtures}/>
			<Route path="/statistiky" exact component={Statistics} />
			<Route path="/onas" exact component={AboutUs}/>
			<Route path="/kontakt" exact component={Contact}/>
			<Route path="/login" exact component={Login} />
            <Route path="/statistiky" exact component={Statistics} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" exact component={Profile} />
			<Route path="/confirmEmail/:id_user/:hash" exact component={ConfirmEmail} />
			<Route path="*" component={Page404}/>
		</Switch>
	);
}