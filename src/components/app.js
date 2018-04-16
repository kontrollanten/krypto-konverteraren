import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';
import UAParser from 'ua-parser-js';

import history from '../history';
import DisclaimerPage from './disclaimer-page';
import Header from './header';
import Home from './home';
import ConvertCurrency from '../containers/convert-currency';
import Profile from './profile';
import FileManager from '../containers/file-manager';
import BrowserChecker from './browser-checker';

const { browser } = UAParser();

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
        <Helmet
          title="Få hjälp med inkomstdeklaration av krypto-handel"
          titleTemplate="%s - K4 Krypto"
          meta={[
            {
              name: 'description',
              content: 'Ska du inkomstdeklarera din handel med krypto-valutor? Få hjälp med K4 Krypto!'
            }
          ]}
        />

				<Header />
				<Router onChange={this.handleRoute} history={history}>
					<Home path="/" />
          <FileManager path="/las-av-fil/:filename?/:action?/:param?" />
          <DisclaimerPage path="/ansvar-och-villkor" />
				</Router>
        {browser.name.toLowerCase() !== 'chrome' && (
          <BrowserChecker />
        )}
			</div>
		);
	}
}
