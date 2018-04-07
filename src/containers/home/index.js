import { connect } from 'preact-redux';
import { fetchCurrencies, fetchResults } from './actions';
import Home from '../../components/home';

const mapStateToProps = state => ({
  currencies: state.Home.currencies,
  fromCurrency: '',
  results: state.Home.results,
  requestUrl: state.Home.requestUrl,
  toCurrency: '',
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchCurrencies());
  },
  onFetchResults: (options) => dispatch(fetchResults(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
