import { connect } from 'preact-redux';
import { analyzeEmptyRows } from './actions';
import ParseRows from '../../components/parse-rows';

const mapStateToProps = (state, ownProps) => {
  const parseRowsState = state.ParseRows[ownProps.filename] || {};
  return {
    emptyRowSuspects: parseRowsState.emptyRowSuspects || [],
    errorMessage: parseRowsState.errorMessage,
    loading: parseRowsState.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAnalyzeEmptyRows: filename => dispatch(analyzeEmptyRows(filename)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseRows);
