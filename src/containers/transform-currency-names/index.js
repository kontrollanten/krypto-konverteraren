import { connect } from 'preact-redux';
import TransformCurrencyNames from '../../components/transform-currency-names';
import { guessCurrencyNames, transformCurrencyName } from './actions';

const mapStateToProps = ({ TransformCurrencyNames: state }) => {
  return {
    currentlyTransforming: state.currentlyTransforming,
    errorMessage: state.errorMessage,
    matches: state.matches,
    searching: state.searching,
    transformed: state.transformed,
  };
};

const mapDispatchToProps = dispatch => ({
  onGuessCurrencyNames: options => dispatch(guessCurrencyNames(options)),
  onTransformCurrencyName: options => dispatch(transformCurrencyName(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformCurrencyNames);
