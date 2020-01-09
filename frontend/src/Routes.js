import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { HomePage } from './pages/public/HomePage';
import { TeamList } from './pages/public/team/TeamList';
import { Statistics } from './pages/public/Statistics';
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
import {MatchCreateInteractive} from "./pages/administration/match/MatchCreateInteractive";
import {CompetitionList} from "./pages/public/competition/CompetitionList";
import { CompetitionDetail } from "./pages/public/competition/CompetitionDetail";
import { CompetitionCreate } from "./pages/administration/competition/CompetitionCreate";
import { CompetitionEdit } from './pages/administration/competition/CompetitionEdit';
import { CompetitionListAdmin } from "./pages/administration/competition/CompetitionListAdmin";
import {useAuth} from "./utils/auth";

export function Routes() {
	const {user} = useAuth();

	const checkAuth = (component, shouldBeLogged) => {
		shouldBeLogged = !!(shouldBeLogged || shouldBeLogged === undefined);
		if (!!user === shouldBeLogged) {
			return component;
		} else {
			return <Redirect to="/"/>;
		}
	};

	return (
		<Switch>
            <Route path="/" exact component={HomePage} />

            <Route path="/login" exact render={() => (checkAuth(<Login/>, false))} />
            <Route path="/register" exact render={() => (checkAuth(<Register/>, false))} />
			<Route path="/resetPassword/:id_user/:hash" exact render={() => (checkAuth(<ResetPassword/>, false))} />
			<Route path="/resendToken/:id_token/:type" exact render={() => (checkAuth(<ResendToken/>, false))} />
			<Route path="/confirmEmail/:id_user/:hash" exact render={() => (checkAuth(<ConfirmEmail/>, false))} />

			<Route path="/statistics" exact component={Statistics} />
			<Route path="/teams/:id_team" exact component={TeamDetail} />
			<Route path="/teams/:id_team/matches/:id_match" exact component={MatchDetail} />
			<Route path="/matches/:id_match" exact component={MatchDetail} />
			<Route path="/teams" exact component={TeamList} />
			<Route path="/users/:id_user" exact component={UserDetail} />

			<Route path="/competitions" exact component={CompetitionList} />
			<Route path="/competitions/:id_competition" exact component={CompetitionDetail} />

			<Route path="/administration" exact render={() => (checkAuth(<AdministrationMenu/>))}/>
      <Route path="/administration/profile" exact render={() => (checkAuth(<UserProfile/>))} />
			<Route path="/administration/teams/:id_team" exact render={() => (checkAuth(<TeamDetailAdmin/>))} />
      <Route path="/administration/teams"  exact render={() => (checkAuth(<TeamListAdmin/>))} />

			<Route path="/administration/teams/:id_team/matches/:id_match" exact render={() => (checkAuth(<MatchEditForm/>))} />
			<Route path="/administration/matches/createForm" exact render={() => (checkAuth(<MatchCreateForm/>))} />
      <Route path="/administration/matches/createInteractive" exact render={() => (checkAuth(<MatchCreateInteractive/>))} />

			<Route path="/administration/competitions" exact render={() => (checkAuth(<CompetitionListAdmin/>))} />
      <Route path="/administration/competitions/create" exact render={() => (checkAuth(<CompetitionCreate/>))} />
      <Route path="/administration/competition/edit/:id_competition" exact component={CompetitionEdit} />  
        
			<Route path="*" component={Page404}/>
		</Switch>
	);
}