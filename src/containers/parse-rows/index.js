import { connect } from 'preact-redux';
import { analyzeEmptyRows, removeRows, verifySuspectedHeader } from './actions';
import ParseRows from '../../components/parse-rows';

const mapStateToProps = (state, ownProps) => {
  const fileState = state.FileManager[ownProps.filename] || {};
  const parseRowsState = state.ParseRows[ownProps.filename] || {};

  return {
    headerRow: fileState.headerRow,
    suspectedEmptyRows: parseRowsState.emptyRowSuspects || [],
    errorMessage: parseRowsState.errorMessage,
    loading: parseRowsState.loading,
    suspectedHeader: parseRowsState.suspectedHeader,
    unparsedResults: fileState.unparsedResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAnalyzeEmptyRows: filename => dispatch(analyzeEmptyRows(filename)),
    onRemoveRows: options => dispatch(removeRows(options)),
    onVerifyHeader: filename => dispatch(verifySuspectedHeader(filename)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseRows);
