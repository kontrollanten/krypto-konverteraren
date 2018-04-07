// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'preact';
import { createStore, applyMiddleware } from 'redux';
import { Provider, compose } from 'preact-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import './style';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

let root;
function init() {
	let App = require('./components/app').default;
	root = render(<Provider store={store}><App /></Provider>, document.querySelector('#app'), root);
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
