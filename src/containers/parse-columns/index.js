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
    currencies: state.ConvertCurrency.currencies,
    parseIndexes: fileState.parseIndexes,
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
