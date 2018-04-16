import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';
import UAParser from 'ua-parser-js';

import history from '../history';
import AboutK4K from './about-k4k';
import AboutUs from './about-us';
import DisclaimerPage from './disclaimer-page';
import FAQ from './faq';
import Footer from './footer';
import Header from './header';
import Home from './home';
import ConvertCurrency from '../containers/convert-currency';
import FileManager from '../containers/file-manager';
import BrowserChecker from './browser-checker';

const { browser } = UAParser();

export default class App extends Component {
	handleRoute = e => {
    window.scrollTo(0, 0);
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
          <AboutK4K path="/om-tjansten" />
          <AboutUs path="/om-k4-krypto" />
          <FAQ path="/fragor-och-svar" />
          <DisclaimerPage path="/ansvar-och-villkor" />
				</Router>
        {browser.name.toLowerCase() !== 'chrome' && (
          <BrowserChecker />
        )}
        <Footer />
			</div>
		);
	}
}
