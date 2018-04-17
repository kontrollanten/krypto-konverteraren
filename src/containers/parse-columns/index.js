import { connect } from 'preact-redux';
import ParseColumns from '../../components/parse-columns';
import {
  setStaticToCurrency,
  parseResults,
  updateParseIndex,
} from '../file-manager/actions';

const mapStateToProps = (state, ownProps) => {
  const fileState = state.FileManager[ownProps.filename] || {};
  const validationState = state.FileValidator[ownProps.filename] || {};

  return {
    amountIndexes: fileState.amountIndexes,
    currencyIndex: fileState.currencyIndex,
    currencies: state.ConvertCurrency.currencies,
    dateIndex: fileState.dateIndex,
    staticToCurrency: fileState.staticToCurrency,
    unparsedResults: fileState.unparsedResults,
    validating: validationState.validating,
    validationErrorMessage: validationState.errorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  onParseConfigFinished: (filename) => dispatch(parseResults(filename)),
  onUpdateParseIndex: (options) => dispatch(updateParseIndex(options)),
  onSetStaticToCurrency: (options) => dispatch(setStaticToCurrency(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseColumns);
