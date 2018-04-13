import { connect } from 'preact-redux';
import { fetchCurrencies } from './actions';
import CurrencySelector from '../../components/currency-selector';

const mapStateToProps = state => ({
  currencies: state.CurrencySelector.currencies,
});

const mapDispatchToProps = dispatch => ({
  onFetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySelector);

