import { h, Component } from 'preact';

export default class CurrencySelector extends Component {
  componentDidMount() {
    this.props.onFetchCurrencies();
  }

  render() {
    return (
      <select {...this.props}>
        <option value="" disabled selected>{this.props.label}</option>
        {this.props.currencies
          .map(currency => <option value={currency.Symbol}>{currency.FullName}</option>)}
      </select>
    );
  }
}

