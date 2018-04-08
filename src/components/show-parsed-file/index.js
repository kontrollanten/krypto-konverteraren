import { h, Component } from 'preact';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import TransactionTable from '../transaction-table';

import styles from './style.less';

export default class ShowParsedFile extends Component {
  handleDownload() {
    this.props.onDownloadParsedResults();
  }

  render() {
    const errorRows = this.props.parseErrorRows;
    const isLoading = (this.props.parsedResults.length + this.props.parseErrorRows.length) === 0;

    return (
      <div className={styles.Container}>
        {isLoading &&
          <div>
            <h1>Hämtar resultat för {this.props.filename}</h1>
            
            <LinearProgress indeterminate />
          </div>
        }
        {!isLoading && (
          <div>
            <h1>Resultat för {this.props.filename}</h1>
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
            <Button
              onClick={this.handleDownload.bind(this)}
              raised
              ripple
            >
              Ladda ner resultat
            </Button>

            <TransactionTable
              rows={this.props.parsedResults}
            />
          </div>
        )}

      </div>
    );
  }
}
