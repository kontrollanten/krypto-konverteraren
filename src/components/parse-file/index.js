import { h, Component } from 'preact';
import history from '../../history';

import CurrencySelector from '../currency-selector';
import styles from './style.less';

export default class ParseFile extends Component {
  state = {
    currentParseKey: '',
    currentParseKeyHuman: '',
    selectedIndexes: [],
  };
 
  constructor(props) {
    super(props);

    this.handleClickColumn = this.handleClickColumn.bind(this);
    this.handleSelectCurrency = this.handleSelectCurrency.bind(this);

    this.setCurrentParseKey('date');
  }

  componentWillReceiveProps({ parseIndexes, staticToCurrency }) {
    switch(true) {
      case parseIndexes.date === null:
        this.setCurrentParseKey('date');
        break;
      case parseIndexes.amount === null:
        this.setCurrentParseKey('amount');
        break;
      case parseIndexes.currency === null && !staticToCurrency:
        this.setCurrentParseKey('currency');
        break;
      default:
        this.props.onParseConfigFinished();
        const nextPath = this.props.url.split('/').filter(section => section !== 'tolka').join('/');
        history.push(nextPath);
    }
  }

  handleClickColumn(event) {
    const index = event.target.getAttribute('data-index');

    this.setState({
      selectedIndexes: [...this.state.selectedIndexes, index],
    });

    this.props.onUpdateParseIndex({
      index,
      key: this.state.currentParseKey,
    });
  }

  handleSelectCurrency({ target }) {
    console.log(target.value);
    this.props.onSetStaticToCurrency(target.value);
  }

  setCurrentParseKey(key) {
    switch(key) {
      case 'date':
        return this.setState({
          currentParseKey: 'date',
          currentParseKeyHuman: 'datum',
        });

      case 'currency':
        return this.setState({
          currentParseKey: 'currency',
          currentParseKeyHuman: 'valutanamnet',
        });
      case 'amount':
        return this.setState({
          currentParseKey: 'amount',
          currentParseKeyHuman: 'transaktionsbelopp',
        });
    }
  }

  render() {
    return (
      <div className={styles.Container}>
        <h1>Tolka filen {this.props.filename}</h1>

        <div className={styles.description}>
          <h2>Klicka på den kolumn som innehåller {this.state.currentParseKeyHuman}</h2>
          <p>Om valuta-namnet inte står med i tabellen och alla transaktioner
            är gjorda med samma valuta kan du ange en statisk valuta.</p>
          <div>
            <CurrencySelector
              currencies={this.props.currencies}
              label="Välj en statisk valuta för samtliga transakationer"
              onChange={this.handleSelectCurrency}
            />
          </div>
        </div>

        <table className={styles.ParseTable}>
          {this.props.unparsedResults
            .map((row, i) => (
              <tr key={i}>
                {row
                  .map((field, index) => ({
                    field,
                    isSelected: this.state.selectedIndexes.indexOf(index.toString()) > -1,
                  }))
                  .map(({ field, isSelected }, index) => (
                    <td
                      key={index}
                      className={isSelected ? styles.Selected : ''}
                      data-index={index}
                      {...(isSelected ? {} : { onClick: this.handleClickColumn })}
                    >
                      {field}
                    </td>
                  ))
                }
              </tr>)
            )}
        </table>
      </div>
    );
  }
}
