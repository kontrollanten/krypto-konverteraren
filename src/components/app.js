import { h, Component } from 'preact';
import { Router } from 'preact-router';

import history from '../history';
import Header from './header';
import ConvertCurrency from '../containers/convert-currency';
import Profile from './profile';
import FileManager from '../containers/file-manager';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div>
				<Header />
				<Router onChange={this.handleRoute} history={history}>
					<ConvertCurrency path="/" />
          <FileManager path="/las-av-fil/:filename?/:action?/:param?" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router>
			</div>
		);
	}
}
