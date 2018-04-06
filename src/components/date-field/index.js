import { h, Component } from 'preact';
import moment from 'moment';

export default class DateField extends Component {
  state = {
    date: '',
    isValid: false,
    isPristine: true,
  };

  constructor(props) {
    super(props);

    this.debounceTimer = null;
  }
  
  handleInputChange(event) {
    const { target } = event;

    this.setState({
      date: target.value,
    });

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      const isValid = moment(target.value).isValid();
      this.setState({
        isValid,
        isPristine: false,
      });

      if (isValid) {
        this.props.onChange(event);
      }
    }, 250);
  }

  render() {
    const { onChange, ...inputProps } = this.props;
    const invalidated = !this.state.isPristine && !this.state.isValid;

    return (
      <div>
        <input
          type="text"
          placeholder="YYYY-mm-dd"
          value={this.state.date}
          onInput={this.handleInputChange.bind(this)}
          {...inputProps}
        />

        {invalidated && (
          <div>Datumet är ogiltigt.</div>
        )}
      </div>
    )
  }
}
