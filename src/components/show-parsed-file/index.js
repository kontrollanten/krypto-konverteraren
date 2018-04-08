import { h, Component } from 'preact';
import LinearProgress from 'preact-material-components/LinearProgress';
import 'preact-material-components/LinearProgress/style.css';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import TransactionTable from '../transaction-table';

import styles from './style.less';

export default class ShowParsedFile extends Component {
  handleDownload() {
    this.props.onDownloadParsedResults();
  }

  render() {
    return (
      <div className={styles.Container}>
        {this.props.parsedResults.length === 0 &&
          <div>
            <h1>Hämtar resultat för {this.props.filename}</h1>
            
            <LinearProgress indeterminate />
          </div>
        }
        {this.props.parsedResults.length > 0 && (
          <div>
            <h1>Resultat för {this.props.filename}</h1>
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
