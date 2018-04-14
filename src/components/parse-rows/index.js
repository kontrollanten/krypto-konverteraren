import { h, Component } from 'preact';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import history from '../../history';
import ContentWrapper from '../content-wrapper';
import TransactionTable from '../transaction-table';
import Header  from '../file-manager-header';

export default class ParseRows extends Component {
  state = {
    progress: 0,
  };

  constructor(props) {
    super(props);

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickVerifyHeader = this.handleClickVerifyHeader.bind(this);
  }

  handleClickNext() {
  }

  handleClickVerifyHeader() {
    this.props.onVerifyHeader(this.props.filename);
    history.push(this.props.url.replace('tolka-rader', 'tolka-kolumner/date'));
  }

  render() {
    return (
      <ContentWrapper>
        <Header>
          <h1>Tolka filen {this.props.filename}</h1>
          <Button
            disabled={this.state.progress < 1 || !this.props.loading}
            onClick={this.handleClickNext}
            raised
            ripple
          >
            {this.props.loading ? 'Validerar' : 'Nästa'}
          </Button>
        </Header>
        {this.props.loading && <p>Analyserar filen.</p>}

        <h2>Filens rubrik</h2>
        {this.props.suspectedHeader && <TransactionTable
          rows={this.props.suspectedHeader}
          onClick={this.handleClickColumn}
          selectedFields={[]}
        />}
        <p>Tjänsten har tolkat ovanstående som filens rubriker. Ser det ut att stämma? </p>
        <Button
          raised
          ripple
          primary
          onClick={this.handleClickVerifyHeader}
        >
          Ja
        </Button>
        <Button
          raised
          ripple
          secondary
        >
          Nej
        </Button>
      </ContentWrapper>
    );
  }
}
