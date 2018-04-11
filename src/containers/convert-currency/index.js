import { connect } from 'preact-redux';
import { fetchCurrencies, fetchResults } from './actions';
import ConvertCurrency from '../../components/convert-currency';

const mapStateToProps = state => ({
  currencies: state.ConvertCurrency.currencies,
  fromCurrency: '',
  results: state.ConvertCurrency.results,
  requestUrl: state.ConvertCurrency.requestUrl,
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
)(ConvertCurrency);
