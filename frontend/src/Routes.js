import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/public/HomePage';
import { TeamList } from './pages/public/team/TeamList';
import { Leagues } from './pages/public/Leagues';
import { Matches } from './pages/public/Matches';
import { Statistics } from './pages/public/Statistics';
import { AboutUs } from './pages/public/AboutUs';
import { Contact } from './pages/public/Contact';
import { Page404 } from './pages/error/Page404';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { UserProfile } from "./pages/administration/user/UserProfile";
import { ConfirmEmail } from "./pages/auth/ConfirmEmail";
import { TeamDetail } from './pages/public/team/TeamDetail';
import { TeamDetailAdmin } from './pages/administration/team/TeamDetailAdmin';
import { TeamListAdmin} from "./pages/administration/team/TeamListAdmin";
import {ResetPassword} from "./pages/auth/ResetPassword";
import {ResendToken} from "./pages/auth/ResendToken";
import { AdministrationMenu } from './pages/administration/AdministrationMenu';
import { MatchEditForm } from './pages/administration/match/MatchEditForm';
import { UserDetail } from './pages/public/user/UserDetail';
import { MatchCreateForm } from './pages/administration/match/MatchCreateForm';
import {MatchDetail} from "./pages/public/match/MatchDetail";
import {CompetitionList} from "./pages/public/competition/CompetitionList";
import {MatchInteractive} from "./pages/administration/match/MatchInteractive";

export function Routes() {
	return (
		<Switch>
            <Route path="/" exact component={HomePage} />

            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
			<Route path="/resetPassword/:id_user/:hash" exact component={ResetPassword} />
			<Route path="/resendToken/:id_token/:type" exact component={ResendToken} />
			<Route path="/confirmEmail/:id_user/:hash" exact component={ConfirmEmail} />

			<Route path="/leagues" exact component={Leagues}/>
            <Route path="/matches" exact component={Matches} />
            <Route path="/matches/match-create-form" exact component={MatchCreateForm} />
			<Route path="/statistics" exact component={Statistics} />
			<Route path="/aboutus" exact component={AboutUs}/>
			<Route path="/contact" exact component={Contact}/>
			<Route path="/teams/:id_team" exact component={TeamDetail} />
			<Route path="/teams/:id_team/matches/:id_match" exact component={MatchDetail} />
			<Route path="/teams" exact component={TeamList} />
			<Route path="/users/:id_user" exact component={UserDetail} />

			<Route path="/competitions" exact component={CompetitionList} />

			<Route path="/administration" exact component={AdministrationMenu} />
            <Route path="/administration/profile" exact component={UserProfile} />
			<Route path="/administration/teams/:id_team" exact component={TeamDetailAdmin} />
            <Route path="/administration/teams" exact component={TeamListAdmin} />

			<Route path="/administration/interactive-match" exact component={MatchInteractive} />
			<Route path="/administration/teams/:id_team/matches/:id_match" exact component={MatchEditForm} />

			<Route path="*" component={Page404}/>
		</Switch>
	);
}