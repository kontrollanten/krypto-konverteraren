import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import history from '../../history';

import TransactionTable from '../transaction-table';
import Wizard from '../parse-columns-wizard';
import Header  from '../file-manager-header';
import styles from './style.less';

export default class ParseColumns extends Component {
  state = {
    progress: 0,
    selectedTableIndexes: [],
  };
 
  constructor(props) {
    super(props);

    this.handleClickColumn = this.handleClickColumn.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleResolveKey = this.handleResolveKey.bind(this);
    this.handleSelectCurrency = this.handleSelectCurrency.bind(this);
  }

  componentDidUpdate({ amountIndexes, currencyIndex, dateIndex, staticToCurrency, parseKey }) {
    if (parseKey !== this.props.parseKey) {
      this.updateSelectedTableIndexes();
    }

    if (staticToCurrency !== this.props.staticToCurrency) {
      this.setWizardStep();
    }

    switch (true) {
      case amountIndexes !== this.props.amountIndexes:
      case currencyIndex !== this.props.currencyIndex:
      case dateIndex !== this.props.dateIndex:
        this.updateSelectedTableIndexes();
        this.setWizardStep();
        break;
    }
  }

  handleClickNext() {
    this.props.onParseConfigFinished(this.props.filename);
    const nextPath = this.props.url.slice(0, this.props.url.indexOf('/tolka-kolumner'));
    history.push(nextPath);
  }

  handleClickColumn(event) {
    const index = parseInt(event.target.getAttribute('data-index'));

    if (this.state.selectedTableIndexes.indexOf(index) > -1) {
      this.props.onUpdateParseIndex({
        index: null,
        key: this.props.parseKey,
        filename: this.props.filename,
      });
    } else {
      this.props.onUpdateParseIndex({
        index,
        key: this.props.parseKey,
        filename: this.props.filename,
      });
    }
  }

  handleSelectCurrency({ target }) {
    this.props.onSetStaticToCurrency({ symbol: target.value, filename: this.props.filename });
  }

  handleResolveKey() {
    let nextKey;

    switch (true) {
      case this.props.amountIndexes.length === 0:
        nextKey = 'amount';
        break;
      case this.props.currencyIndex === null:
        nextKey = 'currency';
        break;
      case this.props.dateIndex === null:
        nextKey = 'date';
    }

    history.push(this.props.url.split('/').slice(0, -1).concat(nextKey).join('/'));
  }

  updateSelectedTableIndexes() {
    const indexes = [...this.props.amountIndexes, this.props.currencyIndex, this.props.dateIndex];

    this.setState({
      selectedTableIndexes: indexes,
    });
  }

  setWizardStep() {
    const progress = ((this.props.dateIndex !== null)
      + (this.props.currencyIndex !== null)
      + (this.props.amountIndexes.length > 0)
      + (this.props.staticToCurrency !== null))
      / 3;

    this.setState({
      progress
    });
  }

  render() {
    if (this.props.validationErrorMessage) {
      return (
        <div className={styles.Container}>
          <Header>
            <h1>Någonting gick fel</h1>
          </Header>
          <p>Vi lyckades inte validera filen {this.props.filename}:</p>
          <p><strong>{this.props.validationErrorMessage}</strong></p>
        </div>
      );
    }

    return (
      <div className={styles.Container}>
        <Header>
          <h1>Tolka filen {this.props.filename}</h1>
          <Button
            disabled={this.state.progress < 1 || this.props.validating}
            onClick={this.handleClickNext}
            raised
            ripple
          >
            {this.props.validating ? 'Validerar' : 'Nästa'}
          </Button>
        </Header>

        <div className={styles.description}>
          <Wizard
            currencies={this.props.currencies}
            currentKey={this.props.parseKey}
            doneKeys={Object.keys(this.props.parseIndexes).filter(v => this.props.parseIndexes[v] !== null)}
            handleSelectCurrency={this.handleSelectCurrency}
            onClickResolve={this.handleResolveKey}
            progress={this.state.progress}
            validating={this.props.validating}
          />
        </div>
        {this.props.unparsedResults && <TransactionTable
          headerRows={[this.props.headerRow]}
          rows={this.props.unparsedResults.slice(0, 10)}
          onClick={this.handleClickColumn}
          selectedFields={this.state.selectedTableIndexes}
        />}
      </div>
    );
  }
}
