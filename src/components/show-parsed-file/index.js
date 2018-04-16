import { h, Component } from 'preact';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import TransactionTable from '../transaction-table';
import Header  from '../file-manager-header';
import ThanksForUsing from '../thanks-for-using';

import styles from './style.less';

export default class ShowParsedFile extends Component {
  state = {
    showThanksDialog: false,
  };

  handleDownload() {
    this.props.onDownloadParsedResults(this.props.filename);
    this.setState({
      showThanksDialog: true,
    });
  }

  render() {
    const errorRows = this.props.parseErrorRows;
    const nrParsedResults = this.props.nrParsedResults;
    const nrExpectedResults = this.props.nrExpectedResults;
    const progress = (nrParsedResults + errorRows) / nrExpectedResults;
    const isLoading = progress !== 1.0;

    return (
      <div className={styles.Container}>
        {this.state.showThanksDialog && <ThanksForUsing />}
        <Header>
          <h1>Resultat för {this.props.filename}</h1>
          <Button
            disabled={isLoading}
            onClick={this.handleDownload.bind(this)}
            raised
            ripple
          >
            Ladda ner resultat
          </Button>
        </Header>
        <h2>{nrParsedResults} av {nrExpectedResults} konverterades</h2>
        <LinearProgress progress={progress.toFixed(1)} indeterminate={false} />
        {!!errorRows.length && (
          <div>
            <p>Resultatet på följande rader kunde inte konverteras:</p>
            <List dense>
              {errorRows.map(row => (
                <List.Item>{row}</List.Item>
              ))}
            </List>
          </div>
        )}

        <TransactionTable
          headerRows={[this.props.headerRows]}
          rows={this.props.parsedResults}
        />
      </div>
    );
  }
}
