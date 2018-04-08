import { h, Component } from 'preact';
import history from '../../history';

import TransactionTable from '../transaction-table';
import Wizard from '../parse-file-wizard';
import styles from './style.less';

export default class ParseFile extends Component {
  state = {
    currentParseKey: '',
    currentParseKeyHuman: '',
    selectedIndexes: [],
    wizardStep: 1,
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

  componentDidUpdate({ parseIndexes }) {
    if (Object.values(parseIndexes).filter(v => v !== null).length !== Object.values(this.props.parseIndexes).filter(v => v !== null).length) {
      this.setWizardStep();
    }
  }

  handleClickColumn(event) {
    const index = parseInt(event.target.getAttribute('data-index'));

    if (this.state.selectedIndexes.indexOf(index) > -1) {
      return;
    }

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

      case 'amount':
        return this.setState({
          currentParseKey: 'amount',
          currentParseKeyHuman: 'transaktionsbelopp',
        });

      case 'currency':
        return this.setState({
          currentParseKey: 'currency',
          currentParseKeyHuman: 'valutanamnet',
        });
    }
  }

  setWizardStep() {
    this.setState({
      wizardStep: 1 + Object.values(this.props.parseIndexes)
        .filter(v => v !== null)
        .length
        + (this.props.staticToCurrency ? 1 : 0),
    });
  }

  render() {
    return (
      <div className={styles.Container}>
        <h1>Tolka filen {this.props.filename}</h1>

        <div className={styles.description}>
          <Wizard
            currencies={this.props.currencies}
            currentStep={this.state.wizardStep}
            handleSelectCurrency={this.handleSelectCurrency}
          />
        </div>
        <TransactionTable
          rows={this.props.unparsedResults.slice(0, 10)}
          onClick={this.handleClickColumn}
          selectedFields={this.state.selectedIndexes}
        />
      </div>
    );
  }
}
