import { h, Component } from 'preact';
import Clipboard from 'react-clipboard.js';
import moment from 'moment';
import 'moment-timezone';
import DateField from '../date-field';
import style from './style.less';

export default class HomeComponent extends Component {
  state = {
    date: '',
    fromCurrency: '',
    toCurrency: '',
    currencies: [
      { FullName: 'Svenska kronor (SEK)', Symbol: 'SEK' },
      { FullName: 'US Dollar (USD)', Symbol: 'USD' },
      { FullName: 'EUR (EUR)', Symbol: 'EUR' },
    ],
    requestUrl: '',
    results: [],
    invalidDate: false,
  };

  constructor(props) {
    super(props);

    fetch('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          currencies: [...this.state.currencies, ...Object.values(jsonResponse.Data)],
        });
      });
  }

  onInputChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => {
      if (!this.isAllFilled()) {
        return;
      }

      this.fetchHistoricalValue();
    });
  }

  isAllFilled() {
    return ['date', 'fromCurrency', 'toCurrency']
      .filter(field => !!this.state[field])
      .length === 3;
  }

  fetchHistoricalValue() {
    const unixDate = moment.tz(this.state.date, 'UTC').unix();
    const requestUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.fromCurrency}&tsym=${this.state.toCurrency}&limit=0&toTs=${unixDate}&aggregate=1`;
    this.setState({
      requestUrl,
    });
    fetch(requestUrl)
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          results: [
            ...jsonResponse.Data
              .map(line => ({
                ...line,
                date: moment.tz(line.time * 1000, moment.tz.guess()).format('YYYY-MM-DD'),
                fromCurrency: this.state.fromCurrency,
                toCurrency: this.state.toCurrency,
              })),
            ...this.state.results,
          ],
        });
      });
  }

  render() {
    return (
      <div class={style.home}>
        <h1>Konvertera valutor</h1>

        <form>
          <DateField
            autofocus
            onChange={this.onInputChange.bind(this)}
            name="date"
          />

          <select
            name="fromCurrency"
            onChange={this.onInputChange.bind(this)}
          >
            <option value="" disabled selected>Från valuta</option>
            {this.state.currencies
              .map(currency => <option value={currency.Symbol}>{currency.FullName}</option>)}
          </select>

          <select
            name="toCurrency"
            onChange={this.onInputChange.bind(this)}
          >
            <option value="" disabled selected>Till valuta</option>
            {this.state.currencies
              .map(currency => <option value={currency.Symbol}>{currency.FullName}</option>)}
          </select>
        </form>

        <p>Senaste förfrågan: <input type="text" disabled value={this.state.requestUrl} style={{ width: '100%' }} /></p>
        <p>&nbsp;</p>
        <table className={style.resultsTable}>
          <tr>
            <th>Datum</th>
            <th>Högsta värde</th>
            <th>Lägsta värde</th>
          </tr>
          {this.state.results
            .map(line => (
              <tr>
                <td>{line.date}</td>
                <td>
                  <Clipboard component="a" button-href="#" data-clipboard-text={line.high}>
                    1 {line.fromCurrency} = {line.high} USD
                  </Clipboard>
                </td>
                <td>
                  <Clipboard component="a" button-href="#" data-clipboard-text={line.low}>
                    1 {line.toCurrency} = {line.low} USD
                  </Clipboard>
                </td>
              </tr>
            ))}
        </table>
      </div>
    );
  }
}
