import { h, Component } from 'preact';
import moment from 'moment';
import 'moment-timezone';
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
        console.log('All field isnt filled', this.state);
        return;
      }
      console.log('All fields are filled');

      this.fetchHistoricalValue();
    });
  }

  isAllFilled() {
    return ['date', 'fromCurrency', 'toCurrency']
      .filter(field => !!this.state[field])
      .length === 3;
  }

  fetchHistoricalValue() {
    const unixDate = moment(this.state.date).unix();
    const requestUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${this.state.fromCurrency}&tsym=${this.state.toCurrency}&limit=0&toTs=${unixDate}&aggregate=1`;
    this.setState({
      requestUrl,
    });
    fetch(requestUrl)
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({
          results: jsonResponse.Data
            .map(line => ({ ...line, date: moment.tz(line.time * 1000, moment.tz.guess()).format('YYYY-MM-DD') })),
        });
      });
  }

  render() {
    return (
      <div class={style.home}>
        <h1>Konvertera valutor</h1>

        <form>
          <input
            placeholder="Date"
            autofocus
            name="date"
            type="date"
            onChange={this.onInputChange.bind(this)}
            value={this.state.date}
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

        <p>Senaste förfrågan: <input type="text" disabled value={this.state.requestUrl} /></p>
        <p>&nbsp;</p>
        {this.state.results
          .map(line => <p>{line.date}: Högsta värde: {line.high} Lägsta värde: {line.low}</p>)}
      </div>
    );
  }
}
