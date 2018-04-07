import { connect } from 'preact-redux';
import FileManager from '../../components/file-manager';
import {
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
  onSelectFile: file => dispatch(selectFile(file)),
  onParseConfigFinished: () => dispatch(parseResults()),
  onUpdateParseIndex: ({ key, index }) => dispatch(updateParseIndex({ key, index })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
