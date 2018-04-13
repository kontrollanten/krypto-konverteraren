import { connect } from 'preact-redux';
import { fetchCurrencies } from '../convert-currency';
import FileManager from '../../components/file-manager';
import {
  downloadParsedResults,
  selectFile,
  setStaticToCurrency,
  parseResults,
  updateParseIndex,
} from './actions';

const mapStateToProps = (state, ownProps) => {
  const fileState = state.FileManager[ownProps.filename] || {};
  const validationState = state.FileValidator[ownProps.filename] || {};

  return {
    currencies: state.ConvertCurrency.currencies,
    nrExpectedResults: fileState.nrExpectedResults,
    parseErrorRows: fileState.parseErrorRows,
    parseIndexes: fileState.parseIndexes,
    parsedResults: fileState.parsedResults,
    staticToCurrency: fileState.staticToCurrency,
    unparsedResults: fileState.unparsedResults,
    validationErrorMessage: validationState.validationErrorMessage,
  };
};

const mapDispatchToProps = dispatch => ({
  onDownloadParsedResults: () => dispatch(downloadParsedResults()),
  onFetchCurrencies: () => dispatch(fetchCurrencies()),
  onSelectFile: file => dispatch(selectFile(file)),
  onSetStaticToCurrency: (options) => dispatch(setStaticToCurrency(options)),
  onParseConfigFinished: (filename) => dispatch(parseResults(filename)),
  onUpdateParseIndex: (options) => dispatch(updateParseIndex(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
