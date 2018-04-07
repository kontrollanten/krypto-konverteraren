import { connect } from 'preact-redux';
import FileManager from '../../components/file-manager';
import {
  downloadParsedResults,
  selectFile,
  parseResults,
  updateParseIndex,
} from './actions';

const mapStateToProps = state => ({
  parseIndexes: state.FileManager.parseIndexes,
  parsedResults: state.FileManager.parsedResults,
  unparsedResults: state.FileManager.unparsedResults,
});

const mapDispatchToProps = dispatch => ({
  onDownloadParsedResults: () => dispatch(downloadParsedResults()),
  onSelectFile: file => dispatch(selectFile(file)),
  onParseConfigFinished: () => dispatch(parseResults()),
  onUpdateParseIndex: ({ key, index }) => dispatch(updateParseIndex({ key, index })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
