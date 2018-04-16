import { connect } from 'preact-redux';
import { fetchCurrencies } from '../convert-currency';
import FileManager from '../../components/file-manager';
import {
  downloadParsedResults,
  selectFile,
} from './actions';

const mapStateToProps = (state, ownProps) => {
  const fileState = state.FileManager[ownProps.filename] || {};
  const validationState = state.FileValidator[ownProps.filename] || {};

  return {
    headerRow: fileState.headerRow,
    nrExpectedResults: fileState.nrExpectedResults,
    nrParsedResults: fileState.nrParsedResults,
    parseErrorRows: fileState.parseErrorRows,
    parsedResults: fileState.parsedResults,
  };
};

const mapDispatchToProps = dispatch => ({
  onDownloadParsedResults: filename => dispatch(downloadParsedResults(filename)),
  onFetchCurrencies: () => dispatch(fetchCurrencies()),
  onSelectFile: file => dispatch(selectFile(file)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
