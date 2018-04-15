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

import styles from './style.less';

export default class ShowParsedFile extends Component {
  handleDownload() {
    this.props.onDownloadParsedResults(this.props.filename);
  }

  render() {
    const errorRows = this.props.parseErrorRows;
    const parsedRows = this.props.parsedResults.filter(r => r !== undefined).length;
    const nrExpectedResults = this.props.nrExpectedResults;
    const progress = (parsedRows + errorRows) / nrExpectedResults;
    const isLoading = progress !== 1.0;

    return (
      <div className={styles.Container}>
        <Header>
          <h1>Resultat för {this.props.filename}</h1>
          <Button
            onClick={this.handleDownload.bind(this)}
            raised
            ripple
          >
            Ladda ner resultat
          </Button>
        </Header>
        <h2>{parsedRows} av {nrExpectedResults} konverterades</h2>
        <LinearProgress progress={progress} />
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
