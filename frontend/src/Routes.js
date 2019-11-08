import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { TeamList } from './pages/teams/list/TeamList';
import { Leagues } from './pages/Leagues';
import { Matches } from './pages/Matches';
import { Statistics } from './pages/Statistics';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';
import { Page404 } from './pages/error/Page404';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Profile } from "./pages/administration/Profile/Profile";
import { ConfirmEmail } from "./pages/auth/ConfirmEmail";
import { TeamDetail } from './pages/teams/detail/TeamDetail';
import { TeamAdminPage } from './pages/administration/Team/TeamAdminPage';
import { TeamsAdminList} from "./pages/administration/Team/TeamsAdminList";
import {ResetPassword} from "./pages/auth/ResetPassword";
import {ResendToken} from "./pages/auth/ResendToken";
import { AdministrationMenu } from './pages/administration/Administration/AdministrationMenu';
import { UserDetail } from './pages/users/detail/UserDetail';

export function Routes() {
	return (
		<Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/administration" exact component={AdministrationMenu} />
            <Route path="/administration/profile" exact component={Profile} />
			<Route path="/administration/teams/:id_team" exact component={TeamAdminPage} />
            <Route path="/administration/teams" exact component={TeamsAdminList} />
			<Route path="/teams/:id_team" exact component={TeamDetail} />
            <Route path="/teams" exact component={TeamList} />
            <Route path="/user/:id_user" exact component={UserDetail} />
			<Route path="/leagues" exact component={Leagues}/>
			<Route path="/matches" exact component={Matches}/>
			<Route path="/statistics" exact component={Statistics} />
			<Route path="/aboutus" exact component={AboutUs}/>
			<Route path="/contact" exact component={Contact}/>			
            <Route path="/statistics" exact component={Statistics} />                     
			<Route path="/resetPassword/:id_user/:hash" exact component={ResetPassword} />
			<Route path="/resendToken/:id_token/:type" exact component={ResendToken} />
            <Route path="/confirmEmail/:id_user/:hash" exact component={ConfirmEmail} />            
			<Route path="*" component={Page404}/>
		</Switch>
	);
}