import { h, Component } from 'preact';
import Clipboard from 'react-clipboard.js';
import Portal from 'preact-portal';
import CurrencySelector from '../currency-selector';
import DateField from '../date-field';
import DropHandler from '../drop-handler';

import style from './style.less';

export default class HomeComponent extends Component {
  state = {
    date: '',
    displayDropHandler: false,
    fromCurrency: '',
    toCurrency: '',
    results: [],
    invalidDate: false,
  };

  constructor(props) {
    super(props);

    this.handleDragOver = this.handleDragOver.bind(this);

    this.props.onLoad();
  }

  handleDragOver(event) {
    this.setState({
      displayDropHandler: true,
    });
  }

  onInputChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (!this.isAllFilled()) {
        return;
      }

      this.props.onFetchResults({
        date: this.state.date,
        fromCurrency: this.state.fromCurrency,
        toCurrency: this.state.toCurrency,
      });
    });
  }

  isAllFilled() {
    return ['date', 'fromCurrency', 'toCurrency']
      .filter(field => !!this.state[field])
      .length === 3;
  }

  fetchHistoricalValue() {
  }

  render() {
    return (
      <div class={style.home} ondragover={this.handleDragOver}>
        {this.state.displayDropHandler && <Portal into="body">
          <DropHandler />
        </Portal>}
        <h1>Konvertera valutor</h1>

        <form>
          <DateField
            autofocus
            onChange={this.onInputChange.bind(this)}
            name="date"
          />

          <CurrencySelector
            currencies={this.props.currencies}
            label="Från valuta"
            name="fromCurrency"
            onChange={this.onInputChange.bind(this)}
          />

          <CurrencySelector
            currencies={this.props.currencies}
            label="Till valuta"
            name="toCurrency"
            onChange={this.onInputChange.bind(this)}
          />
        </form>

        <p>Senaste förfrågan: <input type="text" disabled value={this.props.requestUrl} style={{ width: '100%' }} /></p>
        <p>&nbsp;</p>
        <table className={style.resultsTable}>
          <tr>
            <th>Datum</th>
            <th>Högsta värde</th>
            <th>Lägsta värde</th>
          </tr>
          {this.props.results
            .map(line => (
              <tr>
                <td>{line.date}</td>
                <td>
                  <Clipboard component="a" button-href="#" data-clipboard-text={line.high}>
                    {line.high} USD = 1 {line.fromCurrency}
                  </Clipboard>
                </td>
                <td>
                  <Clipboard component="a" button-href="#" data-clipboard-text={line.low}>
                    {line.low} USD = 1 {line.toCurrency}
                  </Clipboard>
                </td>
              </tr>
            ))}
        </table>
      </div>
    );
  }
}
