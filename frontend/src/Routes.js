import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {HomePage} from './pages/HomePage';
import {Teams} from './pages/Teams';
import {Leagues} from './pages/Leagues';
import {Fixtures} from './pages/Fixtures';
import {Statistics} from './pages/Statistics';
import {Page404} from './pages/error/Page404';

export function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={HomePage}/>
			<Route path="/teams" exact component={Teams}/>
			<Route path="/leagues" exact component={Leagues}/>
			<Route path="/fixtures" exact component={Fixtures}/>
			<Route path="/statistics" exact component={Statistics}/>
			<Route path="*" component={Page404}/>
		</Switch>
	);
}
