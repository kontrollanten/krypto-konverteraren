import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import history from '../../history';
import ContentWrapper from '../content-wrapper';
import TransactionTable from '../transaction-table';
import Header  from '../file-manager-header';
import ButtonGroup from '../button-group';
import styles from './style.less';

export default class ParseRows extends Component {
  state = {
    hasVerifiedHeader: false,
    hasEmptyRows: true,
    progress: 0,
    steps: 2,
  };

  constructor(props) {
    super(props);

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickRemoveRows = this.handleClickRemoveRows.bind(this);
    this.handleClickVerifyHeader = this.handleClickVerifyHeader.bind(this);
    this.props.onAnalyzeEmptyRows(this.props.filename);
  }

  componentDidUpdate({ headerRow, suspectedEmptyRows, unparsedResults }) {
    const hasVerifiedHeader = !!this.props.headerRow.length;
    const hasEmptyRows = !!this.props.suspectedEmptyRows.length;
    const progress = (!!hasVerifiedHeader + !hasEmptyRows) / this.state.steps;

    if (this.props.headerRow !== headerRow) {
      this.setState({
        hasVerifiedHeader,
        progress,
      });
    }

    if (this.props.suspectedEmptyRows !== suspectedEmptyRows) {
      this.setState({
        hasEmptyRows,
        progress,
      });
    }

    if (this.props.unparsedResults !== unparsedResults) {
      this.props.onAnalyzeEmptyRows(this.props.filename);
    }
  }

  handleClickNext() {
    history.push(this.props.url.replace('tolka-rader', 'tolka-kolumner/date'));
  }

  handleClickVerifyHeader() {
    this.props.onVerifyHeader(this.props.filename);
  }

  handleClickRemoveRows() {
    this.props.onRemoveRows({
      filename: this.props.filename,
      indexes: this.props.suspectedEmptyRows.map(r => r.index),
    });
  }

  render() {
    return (
      <ContentWrapper>
        <Header>
          <h1>Tolka filen {this.props.filename}</h1>
          <Button
            disabled={this.state.progress < 1 || this.props.loading}
            onClick={this.handleClickNext}
            raised
            ripple
          >
            {this.props.loading ? 'Validerar' : 'Nästa'}
          </Button>
        </Header>
        {this.props.loading && <p>Analyserar filen.</p>}

        <div className={this.state.hasVerifiedHeader ? styles.Done : ''}>
          <h2>Kolumnrubriker</h2>
          {this.props.suspectedHeader && <TransactionTable
            rows={this.props.suspectedHeader}
            onClick={this.handleClickColumn}
            selectedFields={[]}
          />}
            <div>
              <p>Tjänsten har tolkat ovanstående som kolumnernas rubriker. Ser det ut att stämma? </p>

              <ButtonGroup>
                <Button
                  disabled={this.state.hasVerifiedHeader}
                  raised
                  ripple
                  primary
                  onClick={this.handleClickVerifyHeader}
                >
                  Ja, det är rubriker
                </Button>
                <Button
                  disabled={this.state.hasVerifiedHeader}
                  raised
                  ripple
                  secondary
                >
                  Nej, det är inte rubriker
                </Button>
              </ButtonGroup>
            </div>
        </div>

        <div className={!this.state.hasEmptyRows ? styles.Done : ''}>
          <h2>Tomma rader</h2>
          <TransactionTable
            headerRows={[['Rad', ...this.props.suspectedEmptyRows.map(() => '')]]}
            rows={this.props.suspectedEmptyRows.map(row => [row.index + 1, ...row.row])}
            selectedFields={[]}
          />
          <p>Tjänsten har tolkat ovanstående rader som tomma. Kan vi ta bort dem?</p>

          <ButtonGroup>
            <Button
              disabled={!this.state.hasEmptyRows}
              raised
              ripple
              primary
              onClick={this.handleClickRemoveRows}
            >
              Ja, ta bort dem
            </Button>
            <Button
              disabled={!this.state.hasEmptyRows}
              raised
              ripple
              secondary
            >
              Nej, ta inte bort dem
            </Button>
          </ButtonGroup>
        </div>
      </ContentWrapper>
    );
  }
}
