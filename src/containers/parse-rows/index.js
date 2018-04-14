import { connect } from 'preact-redux';
import { analyzeEmptyRows, verifySuspectedHeader } from './actions';
import ParseRows from '../../components/parse-rows';

const mapStateToProps = (state, ownProps) => {
  const parseRowsState = state.ParseRows[ownProps.filename] || {};
  return {
    emptyRowSuspects: parseRowsState.emptyRowSuspects || [],
    errorMessage: parseRowsState.errorMessage,
    loading: parseRowsState.loading,
    suspectedHeader: parseRowsState.suspectedHeader,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAnalyzeEmptyRows: filename => dispatch(analyzeEmptyRows(filename)),
    onVerifyHeader: filename => dispatch(verifySuspectedHeader(filename)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseRows);
