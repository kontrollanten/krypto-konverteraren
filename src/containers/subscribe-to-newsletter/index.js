import { connect } from 'preact-redux';
import { updateEmail, submit } from './actions';
import SubscribeToNewsletter from '../../components/subscribe-to-newsletter';

const mapStateToProps = state => ({
  email: state.SubscribeToNewsletter.email,
  errorMessage: state.SubscribeToNewsletter.errorMessage,
  isLoading: state.SubscribeToNewsletter.loading,
  success: state.SubscribeToNewsletter.success,
});

const mapDispatchToProps = dispatch => ({
  onChange: email => dispatch(updateEmail(email)),
  onSubmit: () => dispatch(submit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeToNewsletter);
