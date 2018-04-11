import { connect } from 'preact-redux';
import FileManager from '../../components/file-manager';
import {
  downloadParsedResults,
  selectFile,
  setStaticToCurrency,
  parseResults,
  updateParseIndex,
} from './actions';

const mapStateToProps = state => ({
  currencies: state.ConvertCurrency.currencies,
  nrExpectedResults: state.FileManager.nrExpectedResults,
  parseErrorRows: state.FileManager.parseErrorRows,
  parseIndexes: state.FileManager.parseIndexes,
  parsedResults: state.FileManager.parsedResults,
  staticToCurrency: state.FileManager.staticToCurrency,
  unparsedResults: state.FileManager.unparsedResults,
});

const mapDispatchToProps = dispatch => ({
  onDownloadParsedResults: () => dispatch(downloadParsedResults()),
  onSelectFile: file => dispatch(selectFile(file)),
  onSetStaticToCurrency: symbol => dispatch(setStaticToCurrency({ symbol })),
  onParseConfigFinished: () => dispatch(parseResults()),
  onUpdateParseIndex: ({ key, index }) => dispatch(updateParseIndex({ key, index })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
