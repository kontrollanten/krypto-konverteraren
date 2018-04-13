import { connect } from 'preact-redux';
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

  return {
    currencies: state.ConvertCurrency.currencies,
    nrExpectedResults: fileState.nrExpectedResults,
    parseErrorRows: fileState.parseErrorRows,
    parseIndexes: fileState.parseIndexes,
    parsedResults: fileState.parsedResults,
    staticToCurrency: fileState.staticToCurrency,
    unparsedResults: fileState.unparsedResults,
  };
};

const mapDispatchToProps = dispatch => ({
  onDownloadParsedResults: () => dispatch(downloadParsedResults()),
  onSelectFile: file => dispatch(selectFile(file)),
  onSetStaticToCurrency: symbol => dispatch(setStaticToCurrency({ symbol })),
  onParseConfigFinished: (filename) => dispatch(parseResults(filename)),
  onUpdateParseIndex: (options) => dispatch(updateParseIndex(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
